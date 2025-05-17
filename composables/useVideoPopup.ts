export function useVideoPopup() {

  const videoUrl = ref<string>('https://www.youtube.com/embed/EW4ZYb3mCZk')
  const isVideoOpen: Ref<boolean> = ref(false);
  let iframeElement: HTMLIFrameElement | null = null;

  const playVideo = (videoId: string) => {
    if (typeof window !== 'undefined') {
      const videoOverlay = document.querySelector("#video-overlay");
      const newVideoUrl = `https://www.youtube.com/embed/${videoId}`;
  
      
      videoUrl.value = newVideoUrl;
  
      
      if (iframeElement && iframeElement.parentNode) {
        iframeElement.parentNode.removeChild(iframeElement);
      }
  
      // Create a new iframeElement
      iframeElement = document.createElement("iframe");
      iframeElement.setAttribute("src", newVideoUrl);
      iframeElement.style.width = "60%";
      iframeElement.style.height = "80%";
      videoOverlay?.appendChild(iframeElement);
  
      isVideoOpen.value = true;
      videoOverlay?.classList.add("open");
    }
  };
  
  

  
  // close modal video
  const closeVideo = () => {
    if (typeof window !== 'undefined') {
      const videoOverlay = document.querySelector("#video-overlay");

      const iframeToRemove = videoOverlay?.querySelector("iframe");
      if (iframeToRemove) {
        iframeToRemove.remove();
      }

      isVideoOpen.value = false;
      videoOverlay?.classList.remove("open");
    }
  };



  return {
    isVideoOpen,
    playVideo,
    closeVideo
  }

}
