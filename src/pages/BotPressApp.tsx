import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import { useState } from "react";

const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#634433",
});

//Add your Client ID here ⬇️
const clientId = "7292fa31-84cd-46e9-88a1-83f452bee70a";

export default function App() {
  const client = getClient({ clientId });
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <style>{style}</style>
      <WebchatProvider
        theme={theme}
        client={client}
      >
        <Fab onClick={toggleWebchat} />
        <div
          style={{
            display: isWebchatOpen ? "block" : "none",
          }}
        >
          <Webchat />
        </div>
      </WebchatProvider>
    </div>
  );
}