const timeFrames = [
    {
        text: "All",
        params: "",
        cssid: "timeall",
        icon: "fa-calendar"
    },
    {
        text: "Last 1 Day",
        params: "1",
        cssid: "last1day",
        icon: "fa-calendar"
    },
    {
        text: "Last 3 Days",
        params: "3",
        cssid: "last3days",
        icon: "fa-calendar"
    },
    {
        text: "Last 7 Days",
        params: "7",
        cssid: "last7days",
        icon: "fa-calendar"
    },
    {
        text: "Last 15 Days",
        params: "15",
        cssid: "last15days",
        icon: "fa-calendar"
    },
    {
        text: "Last 30 Days",
        params: "30",
        cssid: "last30days",
        icon: "fa-calendar"
    }
];

const status = [
    {
        text: "All",
        cssid: "all",
        params: "all",
        icon: "fa-balance-scale"
    },
    {
        text: "Profit",
        cssid: "profit",
        params: "profit",
        icon: "fa-level-up-alt"
    },
    {
        text: "Loss",
        cssid: "loss",
        params: "loss",
        icon: "fa-level-down-alt"
    },
];

const conditions = [
    {
        text: "Unrealized",
        cssid: "unrealized",
        params: "unrealized",
        icon: "fa-money-check"
    }
];


export default {
    timeFrames,
    status,
    conditions
}
