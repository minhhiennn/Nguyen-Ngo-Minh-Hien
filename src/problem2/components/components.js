const SVGComponent = ({ svgString, className }) => {
  return (
    <span className={className}>
      {React.createElement("div", {
        dangerouslySetInnerHTML: { __html: svgString },
      })}
    </span>
  );
};

function ItemConvert(props) {
  const { data, setData, className } = props;

  // default select token
  const [isShowList, setIsShowList] = React.useState(false);
  const [listTokens, setListTokens] = React.useState([]);
  const dropdownRef = React.useRef(null);

  const handleOnClickTokenOnList = (token) => {
    console.log(token);
    setData((prevToken) => ({
      ...prevToken,
      ...token,
    }));
    setIsShowList((prev) => !prev);
  };

  const handleOnChangeInput = (event) => {
    setData((prevToken) => ({
      ...prevToken,
      amount: event.target.value,
    }));
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShowList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    loadAssetsTokens().then((tokens) => {
      setListTokens(tokens);
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div className={`convert-item ${className}`}>
        <div className="left">
          <div>
            {className == "amount-send" ? "Amount send" : "Amount receive"}
          </div>
          <div>
            <input
              disabled={className == "amount-receive"}
              type="number"
              pattern="\d*"
              value={data.amount}
              onChange={(event) => {
                handleOnChangeInput(event);
              }}
            />
          </div>
        </div>
        <div
          className="right"
          onClick={() => {
            setIsShowList((prev) => !prev);
          }}
        >
          <span>
            <SVGComponent svgString={data?.imgString} />
          </span>
          <span className={"fix-string"}>{data?.name}</span>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAANCAYAAABGkiVgAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEDSURBVHgB7ZLbCcIwFIbTBFHxQrGt1OpDR3AE3cARdAM3sE6gG+gG4gTFDdzAviiCt4KIBanx5KElvaUdwAOnlD9/vvwnBKF/8aW0jZWiGVTVOosiflXtDcD/gD7Ism4yTeINsq6bxMcHTnL8z3foumcnFdg2ZpQii5PWt8tpgiMur+JSAHGKSUrYVrTuOHI4JALNjgFZxh37kgjTc71ys7aVqDSCEeSAAT2q1hvo/Xru2LgSQRvQ+vxeOGB+v56WifHDJHAN2Mc2LJqxJQcltQBohXlRRgnAQqAQWgScBsyFisBZwMLFwC14h+z9sm6phiXy5yblwcQnU/jd3y7Htcj7A3jXXkhXdFF0AAAAAElFTkSuQmCC"
            alt="pull-icon"
          />
        </div>
      </div>
      {isShowList && (
        <div ref={dropdownRef} id="currencyList" className="show-currency-list">
          <ul>
            {listTokens.map((token, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    handleOnClickTokenOnList(token);
                  }}
                >
                  <SVGComponent svgString={token?.imgString} />
                  <span>{token?.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
