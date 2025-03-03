function App() {
  const [amountSendData, setAmountSendData] = React.useState(initData);
  const [amountReceiveData, setAmountReceiveData] = React.useState(initData);
  const { NotificationContainer, NotificationManager } = window.ReactNotifications

  const handleConvert = async () => {
    try {
      const response = await fetch(
        "https://interview.switcheo.com/prices.json"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();

      data = data.sort((a, b) => new Date(b.date) - new Date(a.date));

      if (
        data.find((tokenPrice) => tokenPrice.currency == amountSendData.name) &&
        data.find((tokenPrice) => tokenPrice.currency == amountReceiveData.name)
      ) {
        const amountSend = amountSendData.amount;
        const rateSend = data.find(
          (tokenPrice) => tokenPrice.currency == amountSendData.name
        ).price;
        const rateReceive = data.find(
          (tokenPrice) => tokenPrice.currency == amountReceiveData.name
        ).price;
        setAmountReceiveData((prevData) => {
          return {
            ...prevData,
            amount: (amountSend * rateSend) / rateReceive,
          };
        });
      } else {
        NotificationManager.error(
          "The API does not provide a list of currencies.",
          "Error",
          3000
        );
      }
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="convert-container">
      <ItemConvert
        data={amountSendData}
        setData={setAmountSendData}
        className="amount-send"
      />
      <ItemConvert
        data={amountReceiveData}
        setData={setAmountReceiveData}
        className="amount-receive"
      />
      <button
        onClick={async () => {
          await handleConvert();
        }}
        style={{ cursor: "pointer" }}
      >
        CONFIRM SWAP
      </button>
      <NotificationContainer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
