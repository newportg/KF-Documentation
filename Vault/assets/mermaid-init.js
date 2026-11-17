document.addEventListener("DOMContentLoaded", function () {
  if (typeof mermaid === "undefined") {
    return;
  }

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "default"
  });

  mermaid.run();
});
