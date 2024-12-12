import fooditems from "../../../lib/models"
import dbConnect from '../../../lib/utils2';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
       console.log("hii broo--->");
       await dbConnect(); // Connect to the database
       console.log("connected successsfully");
      const { foodItemsData } = req.body;

      if (!Array.isArray(foodItemsData) || foodItemsData.length === 0) {
        return res.status(400).json({ error: 'Invalid data provided!' });
      }

      // Insert all food items
      const insertedItems = await fooditems.insertMany(foodItemsData);

      res.status(201).json({ success: true, data: insertedItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
