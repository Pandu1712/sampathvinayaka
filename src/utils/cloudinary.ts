/**
 * Optimizes Cloudinary URLs on the fly by injecting auto-format, auto-quality,
 * and responsive width constraints. This dramatically reduces payload size
 * (e.g., from 8MB raw to ~80KB WebP/AVIF), achieving maximum loading speeds.
 */
export const getOptimizedImageUrl = (url: string, width: number = 800): string => {
  if (!url || typeof url !== "string") return "";
  if (!url.includes("res.cloudinary.com")) return url;
  
  // If it already contains optimization flags, return as-is to avoid conflicts
  if (url.includes("/f_auto") || url.includes("/q_auto")) return url;
  
  // Replace the default upload path with optimized responsive transformations
  return url.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${width},c_limit/`);
};
