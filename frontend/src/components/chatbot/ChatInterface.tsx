interface ChatInterfaceProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function ChatInterface({
  isOpen,
  children,
}: ChatInterfaceProps) {
  return (
    <div
      className={`
        fixed z-40
        bottom-20 right-4 lg:bottom-24 lg:right-6
        w-[calc(100vw-2rem)] max-w-sm
        sm:w-96
        md:w-[28rem] md:max-w-md
        lg:w-[32rem] lg:max-w-lg
        xl:w-[36rem] xl:max-w-xl
        2xl:w-[40rem] 2xl:max-w-2xl
        h-[85vh] max-h-[500px]
        sm:h-[90vh] sm:max-h-[600px]
        lg:h-[85vh] lg:max-h-[700px]
        xl:h-[80vh] xl:max-h-[800px]
        2xl:h-[75vh] 2xl:max-h-[900px]
        bg-white
        rounded-3xl
        shadow-2xl border border-gray-100
        flex flex-col
        transform transition-all duration-300 ease-out
        ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
      `}
    >
      {children}
    </div>
  );
}
