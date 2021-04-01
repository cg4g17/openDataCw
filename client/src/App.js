import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Select from "@material-ui/core/Select";
import CanvasJSReact from "./canvasjs.react";
import { MenuItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const App = () => {
  const [industries, setIndustries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [schemes, setSchemes] = useState([
    "Coronavirus Job Retention Scheme",
    "Business rates holiday",
    "Deferring VAT payments",
    "HMRC Time To Pay scheme",
    "Government-funded small business grant or loan schemes",
    "Accredited finance agreements",
    "No Scheme",
  ]);
  const [statuses, setStatuses] = useState(["continues", "stopped", "temp"]);
  const [appliedSchemeIndustry, setAppliedSchemeIndustry] = useState(
    "Business rates holiday"
  );
  const [receivedSchemeIndustry, setReceivedSchemeIndustry] = useState(
    "Business rates holiday"
  );
  const [intendedSchemeIndustry, setIntendedSchemeIndustry] = useState(
    "Business rates holiday"
  );

  const [appliedSchemeSize, setAppliedSchemeSize] = useState(
    "Business rates holiday"
  );
  const [receivedSchemeSize, setReceivedSchemeSize] = useState(
    "Business rates holiday"
  );
  const [intendedSchemeSize, setIntendedSchemeSize] = useState(
    "Business rates holiday"
  );

  const [appliedSchemeCountry, setAppliedSchemeCountry] = useState(
    "Business rates holiday"
  );

  const [statusIndustry, setStatusIndustry] = useState("continues");
  const [statusCountry, setStatusCountry] = useState("continues");
  const [statusSize, setStatusSize] = useState("continues");

  const [filter, setFilter] = useState("industry");
  const [values, setValues] = useState([]);
  const [appliedIndustryPoints, setAppliedIndustryPoints] = useState([]);
  const [receivedIndustryPoints, setReceivedIndustryPoints] = useState([]);
  const [intendedIndustryPoints, setIntendedIndustryPoints] = useState([]);

  const [appliedSizePoints, setAppliedSizePoints] = useState([]);
  const [receivedSizePoints, setReceivedSizePoints] = useState([]);
  const [intendedSizePoints, setIntendedSizePoints] = useState([]);

  const [appliedCountryPoints, setAppliedCountryPoints] = useState([]);

  const [responsePoints, setResponsePoints] = useState([]);

  const [statusIndustryPoints, setStatusIndustryPoints] = useState([]);
  const [statusCountryPoints, setStatusCountryPoints] = useState([]);
  const [statusSizePoints, setStatusSizePoints] = useState([]);

  const handeSelectAppliedSchemeIndustry = (e) => {
    setAppliedSchemeIndustry(e.target.value);
  };

  const handeSelectReceivedSchemeIndustry = (e) => {
    setReceivedSchemeIndustry(e.target.value);
  };

  const handeSelectIntendedSchemeIndustry = (e) => {
    setIntendedSchemeIndustry(e.target.value);
  };

  const handeSelectAppliedSchemeSize = (e) => {
    setAppliedSchemeSize(e.target.value);
  };

  const handeSelectReceivedSchemeSize = (e) => {
    setReceivedSchemeSize(e.target.value);
  };

  const handeSelectIntendedSchemeSize = (e) => {
    setIntendedSchemeSize(e.target.value);
  };

  const handeSelectAppliedSchemeCountry = (e) => {
    setAppliedSchemeCountry(e.target.value);
  };

  const handleSelectStatusIndustry = (e) => {
    setStatusIndustry(e.target.value);
  };

  const handleSelectStatusCountry = (e) => {
    setStatusCountry(e.target.value);
  };

  const handleSelectStatusSize = (e) => {
    setStatusSize(e.target.value);
  };

  useEffect(() => {
    axios.get("https://cg4g17-cw.herokuapp.com/api/industries").then((res) => {
      console.log(res.data);
      setIndustries(res.data);
    });

    axios.get("https://cg4g17-cw.herokuapp.com/api/countries").then((res) => {
      console.log(res.data);
      setCountries(res.data);
    });

    axios.get("https://cg4g17-cw.herokuapp.com/api/sizes").then((res) => {
      console.log(res.data);
      setSizes(res.data);
    });
  }, []);

  useEffect(() => {
    setResponsePoints([]);
    axios
      .get(
        `https://cg4g17-cw.herokuapp.com/api/responses?size=Total&filter=industry`
      )
      .then((res) => {
        console.log(res.data);
        var results = res.data.sort();
        results.splice(2, 1);
        results.forEach((element, index) => {
          var label = decodeURI(
            element[0].replace("http://example.org/Industry/", "")
          );
          label = label.replaceAll("%2C", ",");
          label = label.replaceAll("%3B", ";");
          var point = {
            label: label,
            y: parseInt(element[1]),
          };
          setResponsePoints((responsePoints) => [...responsePoints, point]);
        });
      });
  }, []);

  useEffect(() => {
    setAppliedIndustryPoints([]);
    axios
      .get(
        `https://cg4g17-cw.herokuapp.com/api/applied?scheme=${appliedSchemeIndustry}&filter=industry`
      )
      .then((res) => {
        console.log(res.data);
        var results = res.data.sort();
        results.forEach((element, index) => {
          var label = decodeURI(
            element[0].replace("http://example.org/Industry/", "")
          );
          label = label.replaceAll("%2C", ",");
          label = label.replaceAll("%3B", ";");
          var point = {
            label: label,
            y: parseFloat(element[1]) / 100.0,
          };
          setAppliedIndustryPoints((appliedIndustryPoints) => [
            ...appliedIndustryPoints,
            point,
          ]);
        });
      });
  }, [appliedSchemeIndustry]);

  useEffect(() => {
    setReceivedIndustryPoints([]);
    axios
      .get(
        `https://cg4g17-cw.herokuapp.com/api/received?scheme=${receivedSchemeIndustry}&filter=industry`
      )
      .then((res) => {
        console.log(res.data);
        var results = res.data.sort();
        results.forEach((element, index) => {
          var label = decodeURI(
            element[0].replace("http://example.org/Industry/", "")
          );
          label = label.replaceAll("%2C", ",");
          label = label.replaceAll("%3B", ";");
          var point = {
            label: label,
            y: parseFloat(element[1]) / 100.0,
          };
          setReceivedIndustryPoints((receivedIndustryPoints) => [
            ...receivedIndustryPoints,
            point,
          ]);
        });
      });
  }, [receivedSchemeIndustry]);

  useEffect(() => {
    setIntendedIndustryPoints([]);
    axios
      .get(
        `https://cg4g17-cw.herokuapp.com/api/intending?scheme=${intendedSchemeIndustry}&filter=industry`
      )
      .then((res) => {
        console.log(res.data);
        var results = res.data.sort();
        results.forEach((element, index) => {
          var label = decodeURI(
            element[0].replace("http://example.org/Industry/", "")
          );
          label = label.replaceAll("%2C", ",");
          label = label.replaceAll("%3B", ";");
          var point = {
            label: label,
            y: parseFloat(element[1]) / 100.0,
          };
          setIntendedIndustryPoints((intendedIndustryPoints) => [
            ...intendedIndustryPoints,
            point,
          ]);
        });
      });
  }, [intendedSchemeIndustry]);

  useEffect(() => {
    setAppliedSizePoints([]);
    axios
      .get(
        `https://cg4g17-cw.herokuapp.com/api/applied?scheme=${appliedSchemeSize}&filter=size`
      )
      .then((res) => {
        console.log(res.data);
        var results = res.data.sort();
        results.forEach((element, index) => {
          var label = decodeURI(
            element[0].replace("http://example.org/Size/", "")
          );
          label = label.replaceAll("%2C", ",");
          label = label.replaceAll("%3B", ";");
          var point = {
            label: label,
            y: parseFloat(element[1]) / 100.0,
          };
          setAppliedSizePoints((appliedSizePoints) => [
            ...appliedSizePoints,
            point,
          ]);
        });
      });
  }, [appliedSchemeSize]);

  useEffect(() => {
    setReceivedSizePoints([]);
    axios
      .get(
        `https://cg4g17-cw.herokuapp.com/api/received?scheme=${receivedSchemeSize}&filter=size`
      )
      .then((res) => {
        console.log(res.data);
        var results = res.data.sort();
        results.forEach((element, index) => {
          var label = decodeURI(
            element[0].replace("http://example.org/Size/", "")
          );
          label = label.replaceAll("%2C", ",");
          label = label.replaceAll("%3B", ";");
          var point = {
            label: label,
            y: parseFloat(element[1]) / 100.0,
          };
          setReceivedSizePoints((receivedSizePoints) => [
            ...receivedSizePoints,
            point,
          ]);
        });
      });
  }, [receivedSchemeSize]);

  useEffect(() => {
    setIntendedSizePoints([]);
    axios
      .get(
        `https://cg4g17-cw.herokuapp.com/api/intending?scheme=${intendedSchemeSize}&filter=size`
      )
      .then((res) => {
        console.log(res.data);
        var results = res.data.sort();
        results.forEach((element, index) => {
          var label = decodeURI(
            element[0].replace("http://example.org/Size/", "")
          );
          label = label.replaceAll("%2C", ",");
          label = label.replaceAll("%3B", ";");
          var point = {
            label: label,
            y: parseFloat(element[1]) / 100.0,
          };
          setIntendedSizePoints((intendedSizePoints) => [
            ...intendedSizePoints,
            point,
          ]);
        });
      });
  }, [intendedSchemeSize]);

  useEffect(() => {
    setAppliedCountryPoints([]);
    axios
      .get(
        `https://cg4g17-cw.herokuapp.com/api/applied?scheme=${appliedSchemeCountry}&filter=country`
      )
      .then((res) => {
        console.log(res.data);
        var results = res.data.sort();
        results.forEach((element, index) => {
          var label = decodeURI(
            element[0].replace("http://example.org/Country/", "")
          );
          label = label.replaceAll("%2C", ",");
          label = label.replaceAll("%3B", ";");
          var point = {
            label: label,
            y: parseFloat(element[1]) / 100.0,
          };
          setAppliedCountryPoints((appliedCountryPoints) => [
            ...appliedCountryPoints,
            point,
          ]);
        });
      });
  }, [appliedSchemeCountry]);

  useEffect(() => {
    setStatusIndustryPoints([]);
    axios
      .get(
        `https://cg4g17-cw.herokuapp.com/api/trading?status=${statusIndustry}&filter=industry`
      )
      .then((res) => {
        console.log(res.data);
        var results = res.data.sort();
        results.forEach((element, index) => {
          var label = decodeURI(
            element[0].replace("http://example.org/Industry/", "")
          );
          label = label.replaceAll("%2C", ",");
          label = label.replaceAll("%3B", ";");
          var point = {
            label: label,
            y: parseFloat(element[1]) / 100.0,
          };
          setStatusIndustryPoints((statusIndustryPoints) => [
            ...statusIndustryPoints,
            point,
          ]);
        });
      });
  }, [statusIndustry]);

  useEffect(() => {
    setStatusCountryPoints([]);
    axios
      .get(
        `https://cg4g17-cw.herokuapp.com/api/trading?status=${statusCountry}&filter=country`
      )
      .then((res) => {
        console.log(res.data);
        var results = res.data.sort();
        results.forEach((element, index) => {
          var label = decodeURI(
            element[0].replace("http://example.org/Country/", "")
          );
          label = label.replaceAll("%2C", ",");
          label = label.replaceAll("%3B", ";");
          var point = {
            label: label,
            y: parseFloat(element[1]) / 100.0,
          };
          setStatusCountryPoints((statusCountryPoints) => [
            ...statusCountryPoints,
            point,
          ]);
        });
      });
  }, [statusCountry]);

  useEffect(() => {
    setStatusSizePoints([]);
    axios
      .get(
        `https://cg4g17-cw.herokuapp.com/api/trading?status=${statusSize}&filter=size`
      )
      .then((res) => {
        console.log(res.data);
        var results = res.data.sort();
        results.forEach((element, index) => {
          var label = decodeURI(
            element[0].replace("http://example.org/Size/", "")
          );
          label = label.replaceAll("%2C", ",");
          label = label.replaceAll("%3B", ";");
          var point = {
            label: label,
            y: parseFloat(element[1]) / 100.0,
          };
          setStatusSizePoints((statusSizePoints) => [
            ...statusSizePoints,
            point,
          ]);
        });
      });
  }, [statusSize]);

  const appliedByIndustry = {
    width: 500,
    animationEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Applied Scheme by Industry",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: appliedIndustryPoints,
      },
    ],
  };

  const receivedByIndustry = {
    width: 500,
    animationEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Received Scheme by Industry",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: receivedIndustryPoints,
      },
    ],
  };

  const intendedByIndustry = {
    width: 500,
    animationEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Intending to Apply Scheme by Industry",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: intendedIndustryPoints,
      },
    ],
  };

  const appliedBySize = {
    width: 500,
    animationEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Applied Scheme by Workforce Size",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: appliedSizePoints,
      },
    ],
  };

  const receivedBySize = {
    width: 500,
    animationEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Received Scheme by Workforce Size",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: receivedSizePoints,
      },
    ],
  };

  const intendedBySize = {
    width: 500,
    animationEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Intending to Apply Scheme by Workforce Size",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: intendedSizePoints,
      },
    ],
  };

  const appliedByCountry = {
    width: 700,
    animationEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Applied Scheme by Country",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: appliedCountryPoints,
      },
    ],
  };

  const responsesByIndustry = {
    width: 700,
    animationEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Number of Responses by Industry",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: responsePoints,
      },
    ],
  };

  const statusByIndustry = {
    width: 500,
    animationEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Trading Status by Industry",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: statusIndustryPoints,
      },
    ],
  };

  const statusByCountry = {
    width: 500,
    animationEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Trading Status by Country",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: statusCountryPoints,
      },
    ],
  };

  const statusBySize = {
    width: 500,
    animationEnabled: true,
    theme: "light1", //"light1", "dark1", "dark2"
    title: {
      text: "Trading Status by Workforce Size",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: statusSizePoints,
      },
    ],
  };

  return (
    <div>
      <Typography
        variant="h2"
        component="h3"
        style={{ margin: "auto", width: "30%" }}
      >
        BICS Survey Results
      </Typography>
      <div style={{ marginTop: "3%", marginLeft: "30%" }}>
        <CanvasJSChart
          options={responsesByIndustry}
          /* onRef={ref => this.chart = ref} */
        />
      </div>
      <Typography
        variant="h3"
        component="h3"
        style={{ margin: "auto", width: "30%" }}
      >
        Percentage Responses to Government Schemes
      </Typography>
      <div style={{ marginTop: "2%" }}>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            marginRight: "20%",
            marginLeft: "2%",
          }}
        >
          <CanvasJSChart
            options={appliedByIndustry}
            /* onRef={ref => this.chart = ref} */
          />
          <Select
            style={{ marginLeft: 16 }}
            value={appliedSchemeIndustry}
            onChange={handeSelectAppliedSchemeIndustry}
          >
            {schemes.map((name) => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            marginRight: "20%",
          }}
        >
          <CanvasJSChart
            options={receivedByIndustry}
            /* onRef={ref => this.chart = ref} */
          />
          <Select
            style={{ marginLeft: 16 }}
            value={receivedSchemeIndustry}
            onChange={handeSelectReceivedSchemeIndustry}
          >
            {schemes.map((name) => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
          }}
        >
          <CanvasJSChart
            options={intendedByIndustry}
            /* onRef={ref => this.chart = ref} */
          />
          <Select
            style={{ marginLeft: 16 }}
            value={intendedSchemeIndustry}
            onChange={handeSelectIntendedSchemeIndustry}
          >
            {schemes.map((name) => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div style={{ marginTop: "2%" }}>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            marginRight: "20%",
            marginLeft: "2%",
          }}
        >
          <CanvasJSChart
            options={appliedBySize}
            /* onRef={ref => this.chart = ref} */
          />
          <Select
            style={{ marginLeft: 16 }}
            value={appliedSchemeSize}
            onChange={handeSelectAppliedSchemeSize}
          >
            {schemes.map((name) => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            marginRight: "20%",
          }}
        >
          <CanvasJSChart
            options={receivedBySize}
            /* onRef={ref => this.chart = ref} */
          />
          <Select
            style={{ marginLeft: 16 }}
            value={receivedSchemeSize}
            onChange={handeSelectReceivedSchemeSize}
          >
            {schemes.map((name) => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
          }}
        >
          <CanvasJSChart
            options={intendedBySize}
            /* onRef={ref => this.chart = ref} */
          />
          <Select
            style={{ marginLeft: 16 }}
            value={intendedSchemeSize}
            onChange={handeSelectIntendedSchemeSize}
          >
            {schemes.map((name) => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div
        style={{
          display: "inline-block",
          verticalAlign: "top",
          marginRight: "20%",
          marginLeft: "30%",
          marginTop: "2%",
          marginBottom: "2%",
        }}
      >
        <CanvasJSChart
          options={appliedByCountry}
          /* onRef={ref => this.chart = ref} */
        />
        <Select
          style={{ marginLeft: 16 }}
          value={appliedSchemeCountry}
          onChange={handeSelectAppliedSchemeCountry}
        >
          {schemes.map((name) => (
            <MenuItem value={name}>{name}</MenuItem>
          ))}
        </Select>
      </div>
      <Typography
        variant="h3"
        component="h3"
        style={{ margin: "auto", width: "30%" }}
      >
        Percentage Responses to Trading Status
      </Typography>
      <div style={{ marginTop: "2%", marginBottom: "2%" }}>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            marginRight: "20%",
            marginLeft: "2%",
          }}
        >
          <CanvasJSChart
            options={statusByIndustry}
            /* onRef={ref => this.chart = ref} */
          />

          <Select
            style={{ marginLeft: 16 }}
            value={statusIndustry}
            onChange={handleSelectStatusIndustry}
          >
            <MenuItem value={statuses[0]}>Continuing to Trade</MenuItem>
            <MenuItem value={statuses[1]}>Permanently Ceased Trading</MenuItem>
            <MenuItem value={statuses[2]}>Temporarily Ceased Trading</MenuItem>
          </Select>
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            marginRight: "20%",
          }}
        >
          <CanvasJSChart
            options={statusByCountry}
            /* onRef={ref => this.chart = ref} */
          />
          <Select
            style={{ marginLeft: 16 }}
            value={statusCountry}
            onChange={handleSelectStatusCountry}
          >
            <MenuItem value={statuses[0]}>Continuing to Trade</MenuItem>
            <MenuItem value={statuses[1]}>Permanently Ceased Trading</MenuItem>
            <MenuItem value={statuses[2]}>Temporarily Ceased Trading</MenuItem>
          </Select>
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
          }}
        >
          <CanvasJSChart
            options={statusBySize}
            /* onRef={ref => this.chart = ref} */
          />
          <Select
            style={{ marginLeft: 16 }}
            value={statusSize}
            onChange={handleSelectStatusSize}
          >
            <MenuItem value={statuses[0]}>Continuing to Trade</MenuItem>
            <MenuItem value={statuses[1]}>Permanently Ceased Trading</MenuItem>
            <MenuItem value={statuses[2]}>Temporarily Ceased Trading</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default App;
