# Use a lightweight Python base image
FROM python:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Expose the port your Flask app runs on
EXPOSE 5000

# Define the command to run your Flask application
CMD ["python", "app.py"]