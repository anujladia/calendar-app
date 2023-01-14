import React, { useEffect, useState } from "react";

import Button from "./Button";

const PillBar = (props) => {
  const {
    data,
    orientation = "vertical",
    onChangeSelected,
  } = props;

  const [selected, setSelected] = useState(props.default || 0);
  const [pills, setPills] = useState([]);

  useEffect(() => {
    let _selected = props.default;
    const _pills = data.map((_data, i) => {
      if (_data.selected) _selected = i;

      return {
        id: i,
        selected: _data.selected,
        label: _data.label,
        value: _data.value
      };
    });

    setPills(_pills);
    setSelected(_selected);
  }, []);

  useEffect(() => {
    if (pills.length) {
      onChangeSelected(pills[selected]);
    }
  }, [selected]);

  const changeSelection = (newIndex) => {
    const _pills = JSON.parse(JSON.stringify(pills));
    _pills[newIndex].selected = true;
    if (_pills[selected]?.selected) {
      _pills[selected].selected = false;
    }

    const _selected = newIndex;

    setSelected(_selected)
    setPills(_pills);
  }

  return (
    <div
      style={{
        display: "grid",
        ...(orientation === "horizontal"
          ? {
            gridTemplateColumns: "1fr 1fr",
            gap: "4px",
          }
          : {
            gridTemplateRows: "1fr",
            rowGap: "8px",
          }
        )
      }}
    >
      {pills.map((pillData, i) => (
        <Button
          key={`pill-${i}`}
          label={pillData.label}
          onClick={() => changeSelection(i)}
          selected={selected === i}
        />
      ))}
    </div>
  )
};

export default  PillBar;
