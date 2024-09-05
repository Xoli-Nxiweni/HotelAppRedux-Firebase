// import { db } from "./Firebase/firebase"; // Adjust the path based on your file structure
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

// export const deleteRoomsFromFirestore = async () => {
//   try {
//     const roomsCollectionRef = collection(db, "hotelRooms");
//     const roomsSnapshot = await getDocs(roomsCollectionRef);

//     const deletePromises = roomsSnapshot.docs.map((roomDoc) => deleteDoc(doc(db, "hotelRooms", roomDoc.id)));
//     await Promise.all(deletePromises);

//     console.log("All rooms have been deleted!");
//   } catch (e) {
//     console.error("Error deleting rooms: ", e);
//   }
// };

// // Execute the delete function
// // deleteRoomsFromFirestore();
