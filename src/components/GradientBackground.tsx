import Image from "next/image";

const GradientBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="fixed inset-0 bg-background dark:bg-[linear-gradient(153deg,_#666_-116.67%,_#000_36.94%)] dark:block hidden bg-cover bg-no-repeat" />

      <Image
        src="/assets/stars.svg"
        alt="stars"
        width={100}
        height={100}
        className="hidden dark:block absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] opacity-50 p object-cover"
      />

      <Image
        src="/assets/stars.svg"
        alt="stars"
        width={100}
        height={100}
        className="hidden dark:block absolute top-50 left-50  w-[90%] opacity-20 p object-cover"
      />

      <Image
        src="/assets/moon.svg"
        alt="moon"
        width={10000}
        height={1000}
        className="hidden dark:block absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-50 pointer-events-none"
      />
    </div>
  );
};

export default GradientBackground;
