#Build reactjs app with production mode
npm run build

#Move to build folder
cd build

# Clone inde.html 200.html
cp index.html 200.html

# Start deloying via surge
# The command means deploy current folder to domain thien-photo-app.surge.sh
surge . thien-photo-app.surge.sh