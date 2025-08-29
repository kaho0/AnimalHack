export async function getFirstSpeciesImage(
  speciesName: string,
  commonNames?: string[]
): Promise<string | null> {
  try {
    // Create search queries - try scientific name first, then common names
    const searchQueries = [
      speciesName,
      ...(commonNames || []).slice(0, 2), // Limit to first 2 common names
    ];

    // Try different search strategies
    const searchStrategies = [
      // Strategy 1: Direct file search
      async (query: string) => {
        const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=File:${encodeURIComponent(
          query
        )}&srnamespace=6&srprop=title&srwhat=text&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        return searchData.query?.search || [];
      },
      // Strategy 2: Search with broader terms
      async (query: string) => {
        const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          query
        )}&srnamespace=6&srprop=title&srwhat=text&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        return searchData.query?.search || [];
      },
    ];

    for (const query of searchQueries) {
      for (const strategy of searchStrategies) {
        try {
          const files = await strategy(query);

          if (!files || files.length === 0) continue;

          // Filter for better quality images (avoid thumbnails, icons, etc.)
          const goodFiles = files.filter((file: any) => {
            const title = file.title.toLowerCase();
            return (
              !title.includes("icon") &&
              !title.includes("logo") &&
              !title.includes("thumb") &&
              !title.includes("symbol") &&
              !title.includes("map") &&
              !title.includes("diagram")
            );
          });

          if (goodFiles.length === 0) continue;

          const fileTitle = goodFiles[0].title;

          // Get image URL
          const fileUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
            fileTitle
          )}&prop=imageinfo&iiprop=url&format=json&origin=*`;
          const fileRes = await fetch(fileUrl);
          const fileData = await fileRes.json();
          const page = Object.values(fileData.query?.pages || {})[0] as any;

          if (page?.imageinfo) {
            return page.imageinfo[0].url;
          }
        } catch (strategyError) {
          console.warn(`Strategy failed for query "${query}":`, strategyError);
          continue;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching species image:", error);
    return null;
  }
}
