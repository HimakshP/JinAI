import { motion } from "framer-motion";

export const FloatingIcons = () => {
  const icons = [
    { src: "/gtav.jpg", delay: 0 },
    { src: "/gow.jpg", delay: 1 },
    { src: "/nfs.jpg", delay: 2 },
    { src: "/got.jpg", delay: 3 },
    { src: "/cod.jpg", delay: 4 },
    { src: "/minecraft.jpg", delay: 5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, index) => (
        <motion.img
          key={index}
          src={icon.src}
          alt="Game Icon"
          className="absolute w-64 h-64 rounded-full object-cover floating-icon"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{
            delay: icon.delay * 0.2,
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 3,
          }}
        />
      ))}
    </div>
  );
};

