const statusTable = [
    {
        collection_id: 1,
        check_in_time: "2024-04-15 11:22:43",
        loading_start_time: "2024-04-15 11:34:27",
        loading_finish_time: "2024-04-15 13:11:32",
        check_out_time: null, //"2024-04-15 13:23:12",
    },
    {
        collection_id: 2,
        check_in_time: "2024-04-15 09:30:15",
        loading_start_time: "2024-04-15 09:42:18",
        loading_finish_time: "2024-04-15 11:17:34",
        check_out_time: "2024-04-15 11:29:47",
    },
    {
        collection_id: 3,
        check_in_time: "2024-04-15 10:15:34",
        loading_start_time: "2024-04-15 10:27:19",
        loading_finish_time: "2024-04-15 11:56:34",
        check_out_time: "2024-04-15 12:08:54",
    },
    {
        collection_id: 4,
        check_in_time: "2024-04-15 08:12:24",
        loading_start_time: "2024-04-15 08:24:12",
        loading_finish_time: "2024-04-15 09:46:25",
        check_out_time: "2024-04-15 09:59:32",
    },
    {
        collection_id: 5,
        check_in_time: "2024-04-15 14:22:17",
        loading_start_time: "2024-04-15 14:35:08",
        loading_finish_time: "2024-04-15 16:12:34",
        check_out_time: "2024-04-15 16:25:15",
    },
    {
        collection_id: 6,
        check_in_time: "2024-04-16 11:15:32",
        loading_start_time: "2024-04-16 11:27:54",
        loading_finish_time: "2024-04-16 12:48:25",
        check_out_time: "2024-04-16 13:01:32",
    },
    {
        collection_id: 7,
        check_in_time: "2024-04-16 09:10:26",
        loading_start_time: "2024-04-16 09:21:19",
        loading_finish_time: "2024-04-16 10:48:34",
        check_out_time: "2024-04-16 11:01:23",
    },
    {
        collection_id: 8,
        check_in_time: "2024-04-16 08:45:15",
        loading_start_time: "2024-04-16 08:56:24",
        loading_finish_time: "2024-04-16 10:20:19",
        check_out_time: "2024-04-16 10:33:42",
    },
    {
        collection_id: 9,
        check_in_time: "2024-04-16 12:25:18",
        loading_start_time: "2024-04-16 12:38:19",
        loading_finish_time: "2024-04-16 14:07:42",
        check_out_time: "2024-04-16 14:20:19",
    },
    {
        collection_id: 10,
        check_in_time: "2024-04-16 10:10:32",
        loading_start_time: "2024-04-16 10:22:11",
        loading_finish_time: "2024-04-16 11:44:34",
        check_out_time: "2024-04-16 11:57:23",
    },
    {
        collection_id: 11,
        check_in_time: "2024-04-16 15:30:11",
        loading_start_time: "2024-04-16 15:42:12",
        loading_finish_time: "2024-04-16 17:15:29",
        check_out_time: "2024-04-16 17:29:23",
    },
    {
        collection_id: 12,
        check_in_time: "2024-04-17 09:15:42",
        loading_start_time: "2024-04-17 09:27:23",
        loading_finish_time: "2024-04-17 10:56:38",
        check_out_time: "2024-04-17 11:09:42",
    },
    {
        collection_id: 13,
        check_in_time: "2024-04-17 12:35:28",
        loading_start_time: "2024-04-17 12:47:29",
        loading_finish_time: "2024-04-17 14:19:12",
        check_out_time: "2024-04-17 14:32:21",
    },
    {
        collection_id: 14,
        check_in_time: "2024-04-17 13:45:28",
        loading_start_time: "2024-04-17 13:57:18",
        loading_finish_time: "2024-04-17 15:22:12",
        check_out_time: "2024-04-17 15:35:22",
    },
    {
        collection_id: 15,
        check_in_time: "2024-04-17 10:00:23",
        loading_start_time: "2024-04-17 10:12:29",
        loading_finish_time: "2024-04-17 11:48:15",
        check_out_time: "2024-04-17 12:00:22",
    },
    {
        collection_id: 16,
        check_in_time: "2024-04-17 14:20:12",
        loading_start_time: "2024-04-17 14:32:25",
        loading_finish_time: "2024-04-17 15:58:38",
        check_out_time: "2024-04-17 16:11:42",
    },
    {
        collection_id: 17,
        check_in_time: "2024-04-18 12:42:12",
        loading_start_time: "2024-04-18 12:53:19",
        loading_finish_time: "2024-04-18 14:25:28",
        check_out_time: "2024-04-18 14:37:45",
    },
    {
        collection_id: 18,
        check_in_time: "2024-04-18 10:12:25",
        loading_start_time: "2024-04-18 10:23:15",
        loading_finish_time: "2024-04-18 11:53:32",
        check_out_time: "2024-04-18 12:05:22",
    },
    {
        collection_id: 19,
        check_in_time: "2024-04-18 09:20:25",
        loading_start_time: "2024-04-18 09:32:27",
        loading_finish_time: "2024-04-18 10:58:32",
        check_out_time: "2024-04-18 11:12:18",
    },
    {
        collection_id: 20,
        check_in_time: "2024-04-18 11:22:17",
        loading_start_time: "2024-04-18 11:33:42",
        loading_finish_time: "2024-04-18 13:05:19",
        check_out_time: "2024-04-18 13:18:22",
    },
    {
        collection_id: 21,
        check_in_time: "2024-04-18 08:20:42",
        loading_start_time: "2024-04-18 08:31:32",
        loading_finish_time: "2024-04-18 09:53:24",
        check_out_time: "2024-04-18 10:05:42",
    },
    {
        collection_id: 22,
        check_in_time: "2024-04-19 09:20:15",
        loading_start_time: "2024-04-19 09:32:22",
        loading_finish_time: "2024-04-19 10:55:19",
        check_out_time: "2024-04-19 11:07:15",
    },
    {
        collection_id: 23,
        check_in_time: "2024-04-19 12:42:32",
        loading_start_time: "2024-04-19 12:54:22",
        loading_finish_time: "2024-04-19 14:25:19",
        check_out_time: "2024-04-19 14:37:15",
    },
    {
        collection_id: 24,
        check_in_time: "2024-04-19 10:10:23",
        loading_start_time: "2024-04-19 10:22:19",
        loading_finish_time: "2024-04-19 11:46:12",
        check_out_time: "2024-04-19 11:58:32",
    },
    {
        collection_id: 25,
        check_in_time: "2024-04-19 14:30:12",
        loading_start_time: "2024-04-19 14:42:19",
        loading_finish_time: "2024-04-19 16:05:25",
        check_out_time: "2024-04-19 16:18:15",
    },
    {
        collection_id: 26,
        check_in_time: "2024-04-19 09:42:11",
        loading_start_time: "2024-04-19 09:54:24",
        loading_finish_time: "2024-04-19 11:21:15",
        check_out_time: "2024-04-19 11:34:22",
    },
    {
        collection_id: 27,
        check_in_time: "2024-04-19 10:15:32",
        loading_start_time: "2024-04-19 10:28:11",
        loading_finish_time: "2024-04-19 11:52:32",
        check_out_time: "2024-04-19 12:05:34",
    },
];

module.exports = statusTable;
