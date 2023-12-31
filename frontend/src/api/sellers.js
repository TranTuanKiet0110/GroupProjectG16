const sellers = [
    { id: 1, name: 'Kiet', email: 's3879300@rmit.edu.vn', phone: '0123456789', businessName: 'Kiet123', status: 'approved' },
    { id: 2, name: 'Khanh', email: 's3804620@rmit.edu.vn', phone: '0123456789', businessName: 'Khanh123', status: 'approved' },
    { id: 3, name: 'Minh', email: 's3879953@rmit.edu.vn', phone: '0123456789', businessName: 'Minh123', status: 'pending' },
    { id: 4, name: 'Khoa', email: 's1234567@rmit.edu.vn', phone: '0123456789', businessName: 'Khoa123', status: 'pending' },
];

// get all sellers (all attributes)
export async function getSellers() {
    return new Promise((resolve) => {
        const result = sellers.map((seller) => {
            return { id: seller.id, name: seller.name, email: seller.email, phone: seller.phone, businessName: seller.businessName, status: seller.status }
        });
        setTimeout(() => resolve(result), 1000);
    });
}

export async function getSellersForDashboard() {
    return new Promise((resolve) => {
        const result = sellers.map((seller) => {
            return { id: seller.id, name: seller.name, email: seller.email, phone: seller.phone, status: seller.status }
        });
        setTimeout(() => resolve(result), 1000);
    });
}

