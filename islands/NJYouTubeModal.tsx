import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { getYouTubeVideoId } from "../util/youtube.ts";

interface Props {
  videoUrl: string;
  linkText: string;
}

function NJYouTubeModal({ videoUrl, linkText }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const isOpen = useSignal(false);

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return url;
  };

  const openModal = () => {
    isOpen.value = true;
    modalRef.current?.showModal();
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    isOpen.value = false;
    modalRef.current?.close();
    // Restore body scroll when modal is closed
    document.body.style.overflow = "";
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  return (
    <>
      {/* Trigger Link */}
      <button
        type="button"
        onClick={openModal}
        class="text-white text-xs font-soleil underline hover:no-underline transition-all duration-200 bg-transparent border-none cursor-pointer uppercase"
      >
        {linkText}
      </button>

      {/* Modal */}
      <dialog
        ref={modalRef}
        class="modal bg-black/80 backdrop-blur-sm"
        onKeyDown={handleKeyDown}
        onClick={handleBackdropClick}
      >
        <div class="relative bg-black rounded-lg max-w-4xl w-full mx-4 overflow-hidden">
          {/* Video Container */}
          {isOpen.value && (
            <div
              class="relative w-full"
              style="padding-bottom: 56.25%; height: 0;"
            >
              <iframe
                src={getEmbedUrl(videoUrl)}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                class="absolute top-0 left-0 w-full h-full"
              />
            </div>
          )}
        </div>

        {/* Close Button - Outside the modal container */}
        <button
          type="button"
          onClick={closeModal}
          class="absolute top-2 right-2 lg:top-4 lg:right-4 z-30 text-white bg-black/50 hover:bg-black/70 rounded-full w-8 h-8 flex items-center justify-center border-none cursor-pointer transition-all duration-200"
          aria-label="Fechar vídeo"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </dialog>
    </>
  );
}

export default NJYouTubeModal;
