<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function index()
    {
        return Image::where('user_id', auth()->id())->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $path = $request->file('image')->store('images', 'public');

        $image = Image::create([
            'name' => $request->file('image')->getClientOriginalName(),
            'path' => $path,
            'user_id' => auth()->id()
        ]);

        return response()->json($image, 201);
    }

    public function update(Request $request, Image $image)
    {
        $request->validate([
            'edited_image' => 'required|string'
        ]);

        $image_parts = explode(";base64,", $request->edited_image);
        $image_base64 = base64_decode($image_parts[1]);
        
        $file_name = 'edited_' . $image->name;
        Storage::disk('public')->put('images/' . $file_name, $image_base64);

        $image->update([
            'path' => 'images/' . $file_name
        ]);

        return response()->json($image);
    }

    public function destroy(Image $image)
    {
        Storage::disk('public')->delete($image->path);
        $image->delete();
        return response()->json(null, 204);
    }
}
