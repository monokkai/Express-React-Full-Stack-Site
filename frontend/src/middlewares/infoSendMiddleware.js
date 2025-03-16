const infoSendMiddleware = (config) => (set, get, api) => {
  return config(
    (args) => {
      // Логируем действие
      const logData = {
        date: new Date().toISOString(), // Текущая дата и время
        action: args.type || "unknown", // Тип действия (если есть)
        state: get(), // Текущее состояние
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
