export * from "./apiHelpers";
export * from "./reduxHelpers";

export const formatNumber = (number: number) => {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return (number / 1000000).toFixed(1) + "M";
  }
};

export const sanitizeFilename = (name: string) => {
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").replace(/\s+/g, "_");
};

export const downloadImage = (url: string, filename: string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => console.error("Download error:", error));
};
