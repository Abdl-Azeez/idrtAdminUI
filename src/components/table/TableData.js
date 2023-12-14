

export const transactionData = {
  header: ["#", "Bill for", "Issue Date", "Due date", "total", "status"],
  data: [
    {
      id: "4947",
      bill: "Enterprize Year Subscription",
      name: "Amelia Grant",
      wallet: "0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a",
      balance: "345679100",
      issue: "10-05-2019",
      due: "10-13-2019",
      total: "599.00",
      status: "Due",
    },
    {
      id: "4904",
      bill: "Maintenance Year Subscription",
      name: "Kristen Hawkins",
      wallet: "0xd34e2294289bc709D8d62Ae23235346279741066",
      balance: "6377487700",
      issue: "06-19-2019",
      due: "06-26-2019",
      total: "99.00",
      status: "Paid",
    },
    {
      id: "4829",
      bill: "Enterprize Year Subscription",
      name: "Tommy Vasquez",
      wallet: "0xaBcDeF1234567890aBcDeF1234567890aBcDeF1234",
      balance: "689165500",
      issue: "10-04-2018",
      due: "10-12-2018",
      total: "599.00",
      status: "Paid",
    },
    {
      id: "4830",
      bill: "Enterprize Anniversary Subscription",
      name: "Alejandro Haynes",
      wallet: "0xAbCdEfAbCdEfAbCdEfAbCdEfAbCdEfAbCdEfAbC",
      balance: "25165500",
      issue: "12-04-2018",
      due: "14-12-2018",
      total: "399.00",
      status: "Paid",
    },
    {
      id: "4840",
      bill: "Enterprize Coverage Subscription",
      name: "Brooke Harmon",
      wallet: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf12",
      balance: "1548800000",
      issue: "12-08-2018",
      due: "13-22-2018",
      total: "99.00",
      status: "Cancelled",
    },
  ],
};


export const merchantData = {
  data: [
    {
      id: "4947",
      name: "Amelia Grant",
      wallet: "0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a",
      balance: "345679100",
      agentName: "Agent1"
    },
    {
      id: "4904",
      name: "Kristen Hawkins",
      wallet: "0xd34e2294289bc709D8d62Ae23235346279741066",
      balance: "6377487700",
      agentName: "Agent2"
    },
    {
      id: "4829",
      name: "Tommy Vasquez",
      wallet: "0xaBcDeF1234567890aBcDeF1234567890aBcDeF1234",
      balance: "689165500",
      agentName: "Agent3"
    },
    {
      id: "4830",
      name: "Alejandro Haynes",
      wallet: "0xAbCdEfAbCdEfAbCdEfAbCdEfAbCdEfAbCdEfAbC",
      balance: "25165500",
      agentName: "Agent4"
    },
    {
      id: "4840",
      name: "Brooke Harmon",
      wallet: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf12",
      balance: "1548800000",
      agentName: "Agent5"
    },
    {
      id: "4901",
      name: "Emily Turner",
      wallet: "0xAbCdEf234567890aBcDeF234567890aBcDeF2345",
      balance: "830150200",
      agentName: "Agent6"
    },
    {
      id: "4955",
      name: "Joshua Parks",
      wallet: "0x6789AbCdEf1234567890AbCdEf1234567890AbCdE",
      balance: "460990900",
      agentName: "Agent7"
    },
    {
      id: "4966",
      name: "Lila Mullins",
      wallet: "0xAbCdEf3456789012AbCdEf3456789012AbCdEf345",
      balance: "720300800",
      agentName: "Agent8"
    },
    {
      id: "4977",
      name: "Oliver Brooks",
      wallet: "0xAbCdEf45678901234567890AbCdEf4567890123456",
      balance: "890250600",
      agentName: "Agent9"
    },
    {
      id: "4988",
      name: "Ruby Jordan",
      wallet: "0x3456AbCdEf123456AbCdEf123456AbCdEf123456",
      balance: "321005400",
      agentName: "Agent10"
    },
    {
      id: "5001",
      name: "Sophia Bennett",
      wallet: "0xAbCdEf5678901234567890123456789012345678",
      balance: "430890200",
      agentName: "Agent1"
    },
    {
      id: "5012",
      name: "Aiden Daniels",
      wallet: "0xAbCdEf6789012345678901234567890123456789",
      balance: "820100300",
      agentName: "Agent2"
    },
    {
      id: "5023",
      name: "Zoe Perry",
      wallet: "0x678901AbCdEf1234567890123456789012345678",
      balance: "590230400",
      agentName: "Agent3"
    },
    {
      id: "5034",
      name: "Elijah Turner",
      wallet: "0x567890AbCdEf1234567890123456789012345678",
      balance: "360450500",
      agentName: "Agent1"
    },
    {
      id: "5045",
      name: "Scarlett Brown",
      wallet: "0x4567890AbCdEf1234567890123456789012345678",
      balance: "150670600",
      agentName: "Agent15"
    },
    // ... (add more merchants as needed)
  ],
};

export const agentData = {
  data: [
    {
      "id": "AGT123456",
      "name": "Agent1",
      "wallet_id": "WID123456",
      "balance": 5000.50,
      "no_of_merchants": 10,
      "total_commission": 1200.75,
      "active": true,
      "location": "City1"
    },
    {
      "id": "AGT789012",
      "name": "Agent2",
      "wallet_id": "WID789012",
      "balance": 7500.25,
      "no_of_merchants": 8,
      "total_commission": 900.40,
      "active": true,
      "location": "City2"
    },
    {
      "id": "AGT345678",
      "name": "Agent3",
      "wallet_id": "WID345678",
      "balance": 6200.80,
      "no_of_merchants": 12,
      "total_commission": 1500.20,
      "active": false,
      "location": "City3"
    },
    {
      "id": "AGT901234",
      "name": "Agent4",
      "wallet_id": "WID901234",
      "balance": 4300.60,
      "no_of_merchants": 15,
      "total_commission": 800.90,
      "active": true,
      "location": "City4"
    },
    {
      "id": "AGT567890",
      "name": "Agent5",
      "wallet_id": "WID567890",
      "balance": 5500.30,
      "no_of_merchants": 9,
      "total_commission": 1000.60,
      "active": false,
      "location": "City5"
    },
    {
      "id": "AGT112233",
      "name": "Agent6",
      "wallet_id": "WID112233",
      "balance": 6000.90,
      "no_of_merchants": 11,
      "total_commission": 1100.30,
      "active": true,
      "location": "City6"
    },
    {
      "id": "AGT445566",
      "name": "Agent7",
      "wallet_id": "WID445566",
      "balance": 4800.40,
      "no_of_merchants": 14,
      "total_commission": 950.75,
      "active": false,
      "location": "City7"
    },
    {
      "id": "AGT778899",
      "name": "Agent8",
      "wallet_id": "WID778899",
      "balance": 7000.20,
      "no_of_merchants": 7,
      "total_commission": 1300.50,
      "active": true,
      "location": "City8"
    },
    {
      "id": "AGT334455",
      "name": "Agent9",
      "wallet_id": "WID334455",
      "balance": 5100.60,
      "no_of_merchants": 13,
      "total_commission": 850.25,
      "active": false,
      "location": "City9"
    },
    {
      "id": "AGT667788",
      "name": "Agent10",
      "wallet_id": "WID667788",
      "balance": 5900.75,
      "no_of_merchants": 10,
      "total_commission": 1200.80,
      "active": true,
      "location": "City10"
    },
    {
      "id": "AGT990011",
      "name": "Agent11",
      "wallet_id": "WID990011",
      "balance": 6800.40,
      "no_of_merchants": 15,
      "total_commission": 1100.20,
      "active": false,
      "location": "City11"
    },
    {
      "id": "AGT223344",
      "name": "Agent12",
      "wallet_id": "WID223344",
      "balance": 5300.60,
      "no_of_merchants": 8,
      "total_commission": 950.90,
      "active": true,
      "location": "City12"
    },
    {
      "id": "AGT556677",
      "name": "Agent13",
      "wallet_id": "WID556677",
      "balance": 6200.75,
      "no_of_merchants": 11,
      "total_commission": 1200.30,
      "active": false,
      "location": "City13"
    },
    {
      "id": "AGT889900",
      "name": "Agent14",
      "wallet_id": "WID889900",
      "balance": 4700.50,
      "no_of_merchants": 9,
      "total_commission": 800.40,
      "active": true,
      "location": "City14"
    },
    {
      "id": "AGT112233",
      "name": "Agent15",
      "wallet_id": "WID112233",
      "balance": 5600.30,
      "no_of_merchants": 12,
      "total_commission": 1000.60,
      "active": false,
      "location": "City15"
    },
    {
      "id": "AGT445566",
      "name": "Agent16",
      "wallet_id": "WID445566",
      "balance": 7200.80,
      "no_of_merchants": 13,
      "total_commission": 1500.20,
      "active": true,
      "location": "City16"
    },
    {
      "id": "AGT778899",
      "name": "Agent17",
      "wallet_id": "WID778899",
      "balance": 5900.40,
      "no_of_merchants": 10,
      "total_commission": 1200.75,
      "active": false,
      "location": "City17"
    },
    {
      "id": "AGT334455",
      "name": "Agent18",
      "wallet_id": "WID334455",
      "balance": 5100.25,
      "no_of_merchants": 7,
      "total_commission": 850.60,
      "active": true,
      "location": "City18"
    },
    {
      "id": "AGT667788",
      "name": "Agent19",
      "wallet_id": "WID667788",
      "balance": 6300.90,
      "no_of_merchants": 14,
      "total_commission": 1300.80,
      "active": false,
      "location": "City19"
    },
    {
      "id": "AGT990011",
      "name": "Agent20",
      "wallet_id": "WID990011",
      "balance": 4500.70,
      "no_of_merchants": 9,
      "total_commission": 900.20,
      "active": true,
      "location": "City20"
    },
    // ... (add more agents as needed)
  ]

}





export const orderData = [
  {
    id: "#746F5K2",
    date: "23 Jan 2019, 10:45pm",
    amount: "2300.00",
    status: "Complete",
  },
  {
    id: "#546H74W",
    date: "12 Jan 2020, 10:45pm",
    amount: "120.00",
    status: "Pending",
  },
  {
    id: "#87X6A44",
    date: "26 Dec 2019, 12:15 pm",
    amount: "560.00",
    status: "Complete",
  },
  {
    id: "#986G531",
    date: "21 Jan 2019, 6:12 am",
    amount: "3654.00",
    status: "Cancelled",
  },
  {
    id: "#326T4M9",
    date: "21 Jan 2019, 6:12 am",
    amount: "200.00",
    status: "Complete",
  },
];

