import { useModal } from "@/context/ModalContext";
import { useScrollLock } from "@/context/ScrollLockContext";
import PhotoDetailPage from "./Photo/PhotoDetailPage";

const GlobalModal = () => {
  const { activePhoto, closeModal } = useModal();
  const { unlockScroll } = useScrollLock();

  if (!activePhoto) return null;

  return (
    <PhotoDetailPage
      photo={activePhoto}
      onClose={() => {
        closeModal();
        unlockScroll();
      }}
    />
  );
};

export default GlobalModal;
