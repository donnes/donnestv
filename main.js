import "./style.css";

document.querySelector("#app").innerHTML = `
  <div id="events">
    <div id="follow">-</div>
    <div id="sub">-</div>
    <div id="donation">-</div>
  </div>
`;

function socket() {
  const socketToken = import.meta.env.VITE_SOCKET_TOKEN;

  const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {
    transports: ["websocket"],
  });

  //Perform Action on event
  streamlabs.on("event", (eventData) => {
    if (!eventData.for && eventData.type === "donation") {
      //code to handle donation events
      console.log(eventData.message);
    }
    switch (eventData.type) {
      case "follow":
        document.querySelector("#follow").innerHTML = eventData.message[0].name;
        break;
      case "subscription":
        document.querySelector("#sub").innerHTML = eventData.message[0].name;
        break;
      case "donation":
        const name = eventData.message[0].name;
        const amount = eventData.message[0].formatted_amount;
        document.querySelector("#donation").innerHTML = `${name} - ${amount}`;
        break;
      default:
        //default case
        console.log(eventData.message);
    }
  });
}

socket();
