const range = [
    {
        text: "All",
        params: "",
        id: "timeall",
        icon: "fa-calendar"
    },
    {
        text: "Last 1 Day",
        params: "1",
        id: "last1day",
        icon: "fa-calendar"
    },
    {
        text: "Last 3 Days",
        params: "3",
        id: "last3days",
        icon: "fa-calendar"
    },
    {
        text: "Last 7 Days",
        params: "7",
        id: "last7days",
        icon: "fa-calendar"
    },
    {
        text: "Last 15 Days",
        params: "15",
        id: "last15days",
        icon: "fa-calendar"
    },
    {
        text: "Last 30 Days",
        params: "30",
        id: "last30days",
        icon: "fa-calendar"
    }
];

const status = [
    {
        text: "All",
        id: "all",
        params: "all",
        icon: "fa-balance-scale"
    },
    {
        text: "Profit",
        id: "profit",
        params: "profit",
        icon: "fa-level-up-alt"
    },
    {
        text: "Loss",
        id: "loss",
        params: "loss",
        icon: "fa-level-down-alt"
    },
];

const gains = [
    {
        text: "Unrealized",
        id: "unrealized",
        params: "unrealized",
        icon: "fa-money-check"
    }
];


export default {
    range,
    status,
    gains
}
