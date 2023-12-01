const loadScript = (src, id) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.async = true;

    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
  });
};

export default loadScript;
