# Frontend

This is the frontend repository for the project.

## Functional Requirements

- Users can register using email or social media accounts.
- Users must be able to log in securely and have a password recovery mechanism.
- Users can upload PDF documents and images for editing.
- PDF tools should include features like text editing, annotation, merging, splitting, and page rotation.
- Photo editing tools should include features like cropping, resizing, adding text or images, filters, background removing, and basic retouching.
- Users can save both PDF and images.
- Users can download PDFs and images.
- Users can convert PDFs to image formats (e.g., JPG, PNG, etc.) and vice versa.
- Users can save their edited PDFs and images to cloud storage services like Google Drive or Dropbox.
- Users can collaborate on PDF and photo editing projects, including sharing and real-time collaboration features.
- Users can view and manage their uploaded documents, edited files, and project history.
- Users will get options for personalized profiles.
- Users will get push notifications regarding updates and promotional efforts.

## Installation and Setup

1. Clone this repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Copy the folders 'core' and 'ui' from 'node_modules/@pdftron/webviewer/public' and then create a folder 'public/lib' and paste 'core' and 'ui' inside that. 
5. Run `npm run dev` to start the development server.


## Technologies Used

- React
- React Router (for routing)
- Axios (for HTTP requests)
- pdftron (for pdf manipulation)
