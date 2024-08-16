import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define a transform to handle specific storage transformations if needed
const authTransform = createTransform(
  (inboundState) => inboundState, // Transform the state before saving to storage
  (outboundState) => outboundState, // Transform the state before rehydrating from storage
);

const persistConfig = {
  key: 'root', // Key for the storage
  storage, // Define the storage engine
  transforms: [authTransform], // Apply any transformations if needed
};

export default persistConfig;
