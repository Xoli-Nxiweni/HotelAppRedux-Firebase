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


import { db } from "./Firebase/firebase"; // Adjust the path based on your file structure
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export const deleteDuplicateRoomsFromFirestore = async () => {
  try {
    const roomsCollectionRef = collection(db, "hotelRooms");
    const roomsSnapshot = await getDocs(roomsCollectionRef);

    const roomsMap = new Map();
    const deletePromises = [];

    // Iterate over all rooms and check for duplicates based on 'id'
    roomsSnapshot.forEach((roomDoc) => {
      const roomData = roomDoc.data();
      const roomId = roomData.id;

      if (roomsMap.has(roomId)) {
        // Duplicate found, add the document to the delete list
        console.log(`Deleting duplicate room with id: ${roomId}`);
        deletePromises.push(deleteDoc(doc(db, "hotelRooms", roomDoc.id)));
      } else {
        // First occurrence of the room, keep it
        roomsMap.set(roomId, roomDoc.id);
      }
    });

    // Execute all delete operations for duplicates
    await Promise.all(deletePromises);

    console.log("Duplicates deleted, only unique rooms remain!");
  } catch (e) {
    console.error("Error deleting duplicate rooms: ", e);
  }
};

// Execute the delete function
// deleteDuplicateRoomsFromFirestore();
