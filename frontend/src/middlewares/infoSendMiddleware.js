const infoSendMiddleware = (config) => (set, get, api) => {
  return config(
    (args) => {
      const logData = {
        date: new Date().toISOString(), 
        action: args.type || "unknown", 
        state: get(), 
      };

      fetch("http://localhost:3000/logger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      }).then((response) => {
        console.log("Log sent successfully:", logData);
      });
      set(args);
    },
    get,
    api
  );
};

export default infoSendMiddleware;
