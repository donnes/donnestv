import "./style.css";

document.querySelector("#app").innerHTML = `
  <div id="events">
    <div id="follow">-</div>
    <div id="sub">-</div>
    <div id="donation">-</div>
  </div>
`;

function socket() {
  const socketToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjU5MkIzODU4NjEzQzJGOTBDQzUyNzEyNTNFQUIxN0RCRDNBM0NGNTc4RkZFMTcyRUMzNjJCRjVEMUVENjY2QUI3NzdDODk1QkJGRUQ1NEM1QTZCRjREOUNGQUVERDg3MEU1NEQ2RDFFNDRDNkMwRUEzQjJGMDk1Rjg2NEU3NDhGQTQ2NzlCQ0MzRDRCMDU0QzI0Q0VCQzE3QThBQjI0ODExRDZFNTc4Q0M5MzFEQjg2NDNFQjY3NDIyREFFQzA2OEJDOTRCNTI2QTZCRTdGRDZBOURDRUNDMjdGNzQ4QUE0MzBFNUUzRDk4RkNEOEJEMkM0QThDNEE1QTUiLCJyZWFkX29ubHkiOnRydWUsInByZXZlbnRfbWFzdGVyIjp0cnVlLCJ0d2l0Y2hfaWQiOiI2ODEwODM3NyIsInN0cmVhbWxhYnNfaWQiOiI1Njc3OTQ4MzczNzQzNjk3OTIiLCJ5b3V0dWJlX2lkIjoiVUNacXkwdEhjWnhVZWdseXgxa09oWmd3IiwidGlrdG9rX2lkIjoiNTMxZGU3NDctYjcwMS01OWUyLWI3ZjMtOWMzMzJjYzg2NzM1In0.kU6YJ5QJzVhU7d0IcVSrOgD-W9HsSTvYyYBK4snsmeg";

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
