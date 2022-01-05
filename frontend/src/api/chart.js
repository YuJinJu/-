// import { Line, mixins } from "vue-chartjs";
// const { reactiveProp } = mixins;
import { chartInstance } from "./index.js";
const chart = chartInstance();
function getMonthList(period) {
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let month_list = [];
  console.log(period);
  for (let i = 0; i < period; i++) {
    // console.log(i);
    // console.log(month);
    if (parseInt(month) <= 0) {
      year = year - 1;
      month = 12;
    } else if (parseInt(month) < 10) {
      month = "0" + month;
    }
    month_list.push(year + "" + month);
    month = parseInt(month) - 1 + "";
  }
  return month_list;

  //   api.get(`/board`, { params: param }).then(success).catch(fail);
}

function houseList(params, success, fail) {
  chart.get(``, { params: params }).then(success).catch(fail);
}

function getAptDealFrequency(houses) {
  let datacollection = {
    // Data for the y-axis of the chart
    labels: [],
    datasets: [
      {
        label: "Data One",
        backgroundColor: "#f87979",
        // Data for the x-axis of the chart
        data: [],
      },
    ],
  };

  console.log(houses);
  let label = new Map();
  for (let i = 0; i < houses.length; i++) {
    if (label.has(houses[i].법정동)) {
      label.set(houses[i].법정동, label.get(houses[i].법정동) + 1);
    } else {
      label.set(houses[i].법정동, 1);
    }
  }
  for (let entry of label) {
    datacollection.labels.push(entry[0]);
    datacollection.datasets[0].data.push(entry[1]);
  }
  return datacollection;
}

function dealTypePerDealFrequency(houses) {
  let datacollection = {
    // Data for the y-axis of the chart
    labels: [],
    datasets: [
      {
        label: "Data One",
        backgroundColor: "#f87979",
        // Data for the x-axis of the chart
        data: [],
      },
    ],
  };
  let label = new Map();
  for (let i = 0; i < houses.length; i++) {
    if (label.has(houses[i].거래유형)) {
      label.set(houses[i].거래유형, label.get(houses[i].거래유형) + 1);
    } else {
      label.set(houses[i].거래유형, 1);
    }
  }
  for (let entry of label) {
    datacollection.labels.push(entry[0]);
    datacollection.datasets[0].data.push(entry[1]);
  }
  return datacollection;
}

function floorPerDealAmount(houses) {
  let datacollection = {
    // Data for the y-axis of the chart
    labels: [],
    datasets: [
      {
        label: "Data One",
        backgroundColor: "#f87979",
        // Data for the x-axis of the chart
        data: [],
      },
    ],
  };
  let label = new Map();
  let data = new Map();
  for (let i = 0; i < houses.length; i++) {
    let dealamount = houses[i].거래금액.replace(/,/g, "");
    if (data.has(houses[i].층)) {
      data.set(houses[i].층, data.get(houses[i].층) + parseInt(dealamount));
    } else {
      data.set(houses[i].층, parseInt(dealamount));
    }
    if (label.has(houses[i].층)) {
      label.set(houses[i].층, label.get(houses[i].층) + 1);
    } else {
      label.set(houses[i].층, 1);
    }
  }
  // sort by key
  label = new Map(
    [...label.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  );
  for (let entry of label) {
    datacollection.labels.push(entry[0]);
    datacollection.datasets[0].data.push(data.get(entry[0]) / entry[1]);
  }
  console.log(datacollection);
  return datacollection;
}

function monthPerDealFrequency(houses, period) {
  let datacollection = {
    // Data for the y-axis of the chart
    labels: [],
    datasets: [
      {
        label: "Data One",
        backgroundColor: "#f87979",
        // Data for the x-axis of the chart
        data: [],
      },
    ],
  };
  console.log(period);
  datacollection.labels = period.reverse();
  // let label = new Map();
  let data = new Map();
  for (let i = 0; i < houses.length; i++) {
    let year = houses[i].년;
    let month = houses[i].월;
    if (month < 10) {
      month = "0" + month;
    }
    let key = year + "" + month;
    console.log(key);
    if (data.has(key)) {
      data.set(key, data.get(key) + 1);
    } else {
      data.set(key, 1);
    }
  }

  for (let entry of datacollection.labels) {
    // console.log(entry);
    datacollection.datasets[0].data.push(data.get(entry));
  }
  console.log(datacollection);
  return datacollection;
}

export {
  getMonthList,
  houseList,
  getAptDealFrequency,
  dealTypePerDealFrequency,
  floorPerDealAmount,
  monthPerDealFrequency,
};
