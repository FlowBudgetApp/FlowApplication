const HARDdata = {
    transactions: [
        {
            id: '1',
            payee: 'Netflix',
            category: 'Entertainment',
            cost: '14.99',
            date: 'Feb 16, 2025'
        },
        {
            id: '2',
            payee: 'Walmart',
            category: 'Shopping',
            cost: '56.78',
            date: 'Feb 15, 2025'
        },
        {
            id: '3',
            payee: 'Uber',
            category: 'Transportation',
            cost: '24.50',
            date: 'Feb 15, 2025'
        },
        {
            id: '4',
            payee: 'Starbucks',
            category: 'Food & Drink',
            cost: '7.85',
            date: 'Feb 18, 2025'
        },
        {
            id: '5',
            payee: 'Amazon',
            category: 'Shopping',
            cost: '43.29',
            date: 'Feb 19, 2025'
        },
        {
            id: '6',
            payee: 'Spotify',
            category: 'Entertainment',
            cost: '9.99',
            date: 'Feb 20, 2025'
        },
        {
            id: '7',
            payee: 'Gas Station',
            category: 'Transportation',
            cost: '35.62',
            date: 'Feb 21, 2025'
        },
        {
            id: '8',
            payee: 'Trader Joe\'s',
            category: 'Groceries',
            cost: '78.34',
            date: 'Feb 22, 2025'
        },
        {
            id: '9',
            payee: 'Gym Membership',
            category: 'Health & Fitness',
            cost: '49.99',
            date: 'Feb 23, 2025'
        },
        {
            id: '10',
            payee: 'Phone Bill',
            category: 'Utilities',
            cost: '65.00',
            date: 'Feb 24, 2025'
        },
    ],
    PlannerInfo: [
        {
            title: 'Vacation',
            categories: [
                { name: "Airplane Ticket", totalCost: 900, currentAmount: 90 },
                { name: "Clothes", totalCost: 500, currentAmount: 125 }
            ]
        },
        {
            title: 'New Car',
            categories: [
                { name: "Down Payment", totalCost: 2000, currentAmount: 500 },
                { name: "Insurance", totalCost: 1000, currentAmount: 250 }
            ]
        },
        {
            title: 'Home Renovation',
            categories: [
                { name: "Kitchen", totalCost: 5000, currentAmount: 1500 },
                { name: "Bathroom", totalCost: 3000, currentAmount: 800 }
            ]
        },
        {
            title: 'Gaming Setup',
            categories: [
                { name: "PC", totalCost: 2500, currentAmount: 1000 },
                { name: "Monitor", totalCost: 800, currentAmount: 300 }
            ]
        },
        {
            title: 'Fitness Equipment',
            categories: [
                { name: "Treadmill", totalCost: 1200, currentAmount: 400 },
                { name: "Weights", totalCost: 600, currentAmount: 200 }
            ]
        }
    ],
    CatergoriesInfo: [
        {
            name: 'Water Bill',
            type: 'Bills',
            amount: { totalCost: 2000, currentAmount: 523 }
        },
        {
            name: 'Electricity Bill',
            type: 'Bills',
            amount: { totalCost: 1800, currentAmount: 412 }
        },
        {
            name: 'Gas Bill',
            type: 'Bills',
            amount: { totalCost: 1200, currentAmount: 289 }
        },
        {
            name: 'Internet Bill',
            type: 'Bills',
            amount: { totalCost: 960, currentAmount: 80 }
        },
        {
            name: 'Netflix',
            type: 'Streaming Services',
            amount: { totalCost: 40, currentAmount: 23 }
        },
        {
            name: 'Disney+',
            type: 'Streaming Services',
            amount: { totalCost: 35, currentAmount: 10 }
        },
        {
            name: 'Hulu',
            type: 'Streaming Services',
            amount: { totalCost: 30, currentAmount: 15 }
        }
    ],
    AccountsInfo: [
        { name: "Account 1", balance: 500, type: "Debit" },
        { name: "Account 2", balance: 1000, type: "Credit" },
        { name: "Account 3", balance: 750, type: "Debit" },
    ],
    Spending: [
        { name: 'Food', amount: 56.78, color: '#FF6384' },
        { name: 'Transport', amount: 24.50, color: '#36A2EB' },
        { name: 'Entertain', amount: 14.99, color: '#FFCE56' },
    ],
    groupAccountsByType: function() {
        // Calculate total balance
        const totalBalance = this.AccountsInfo.reduce((sum, acc) => sum + acc.balance, 0);
        
        // Group accounts by type
        const groupedAccounts = this.AccountsInfo.reduce((acc, account) => {
            if (!acc[account.type]) acc[account.type] = [];
            acc[account.type].push(account);
            return acc;
        }, {});
        
        return [
            { type: "NetWorth", totalBalance, groupedAccounts }, // Net worth block
            ...Object.keys(groupedAccounts).map((type) => ({ type, accounts: groupedAccounts[type] })), // Account types
        ];
    },
    groupCategoriesByType: function() {
        // Calculate total cost and current amount across all categories
        const totalCost = this.CatergoriesInfo.reduce((sum, cat) => sum + cat.amount.totalCost, 0);
        const totalCurrentAmount = this.CatergoriesInfo.reduce((sum, cat) => sum + cat.amount.currentAmount, 0);
        
        // Group categories by type
        const groupedCategories = this.CatergoriesInfo.reduce((acc, category) => {
            if (!acc[category.type]) acc[category.type] = [];
            acc[category.type].push(category);
            return acc;
        }, {});

        return Object.entries(groupedCategories).map(([type, items]) => ({
            type,
            items
          }));
    }
}

export default HARDdata