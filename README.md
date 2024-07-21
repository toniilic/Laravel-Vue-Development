# Laravel Vue Image Editor

This project is an advanced image editing web application built with Laravel and Vue.js. It demonstrates the integration of a robust backend API with a dynamic frontend, showcasing real-time image manipulation and storage.

## Features

- Image upload and storage
- Real-time image editing:
  - Apply filters (Grayscale, Sepia)
  - Adjust brightness
  - Crop images
  - Rotate images
  - Flip images horizontally and vertically
- Save edited images
- View and manage saved images
- Responsive design

## Tech Stack

- Backend: Laravel 8
- Frontend: Vue.js 3
- State Management: Vuex 4
- Routing: Vue Router 4
- Image Manipulation: Fabric.js
- API: RESTful with Laravel Sanctum for authentication

## Prerequisites

- PHP >= 7.3
- Composer
- Node.js >= 12.x
- npm

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/toniilic/Laravel-Vue-Development.git
   cd Laravel-Vue-Development
   ```

2. Install PHP dependencies:
   ```
   composer install
   ```

3. Install JavaScript dependencies:
   ```
   npm install
   ```

4. Copy the example env file and make the required configuration changes in the .env file:
   ```
   cp .env.example .env
   ```

5. Generate a new application key:
   ```
   php artisan key:generate
   ```

6. Run database migrations:
   ```
   php artisan migrate
   ```

7. Create a symbolic link to storage:
   ```
   php artisan storage:link
   ```

8. Compile assets:
   ```
   npm run dev
   ```

## Running the Application

1. Start the Laravel development server:
   ```
   php artisan serve
   ```

2. In a separate terminal, run the Webpack dev server:
   ```
   npm run watch
   ```

3. Visit  in your browser.

## Testing

Run PHP tests:
```
php artisan test
```

Run JavaScript tests:
```
npm run test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Author

Toni Ilić
