// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import '../../css/seller.css';
// import sellerData from "../../api/sellerdata";
//  function SellerPage(){
//     const [sellerInfo, setSellerInfo] = useState(null);
//     const [selectedId, setSelectedId] = useState("");

//     // useEffect(() => {
//     //     // Function to update sellerInfo based on selectedId
//     //     const updateSellerInfo = () => {
//     //         const selectedSeller = sellerData.find((seller) => seller.id === parseInt(selectedId));
//     //         if (selectedSeller) {
//     //             setSellerInfo(selectedSeller);
//     //         } else {
//     //             setSellerInfo(null); 
//     //         }
//     //     };

//     //     updateSellerInfo(); 

//     //     setTimeout(() => {
//     //         updateSellerInfo();
//     //     }, 1000);
//     // }, [selectedId]);

//     return(
//         <div className='sellerpage'>
//             <Navbar />
//             <div class='sellerId'>
//                     <label htmlFor="sellerId">Seller:</label>
//                     <select
//                         id="sellerId"
//                         name="sellerId"
//                         onChange={(e) => setSelectedId(e.target.value)}
//                         value={selectedId}
//                     >
//                         <option value="">Select an ID</option>
//                         {sellerData.map((seller) => (
//                             <option key={seller.id} value={seller.id}>
//                                 {seller.id}
//                             </option>
//                         ))}
//                     </select>
//             </div>
//             <div className='seller-container'>
//                 {sellerInfo ? (
//                     `Welcome ${sellerInfo.name} to Seller Management Page`
//                 ) : (
//                     "No data available"
//                 )}
//             </div>
            
            
//         </div>
//     )
//  }

//  export default SellerPage