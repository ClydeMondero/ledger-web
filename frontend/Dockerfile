# Use official Node image
FROM node:18

# Set working dir inside container
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Expose the port Vite uses
EXPOSE 5173

# Run the Vite dev server
CMD ["npm", "run", "dev"]