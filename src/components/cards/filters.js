const timeFrames = [
    {
        text: "All",
        params: "",
        cssid: "all",
    },
    {
        text: "Last 1 Day",
        params: "1",
        cssid: "last1day",
    },
    {
        text: "Last 3 Days",
        params: "3",
        cssid: "last3days",
    },
    {
        text: "Last 7 Days",
        params: "7",
        cssid: "last7days",
    },
    {
        text: "Last 15 Days",
        params: "15",
        cssid: "last15days",
    },
    {
        text: "Last 30 Days",
        params: "30",
        cssid: "last30days",
    }
];

const status = [
    {
        text: "All",
        cssid: "all",
        params: "all",
    },
    {
        text: "Profit",
        cssid: "profit",
        params: "profit",
    },
    {
        text: "Loss",
        cssid: "loss",
        params: "loss",
    },
];


export default {
    timeFrames,
    status,
}
