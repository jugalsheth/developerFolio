#!/bin/bash

# Aggressive Video Compression Script for Web Use
# Compresses videos to ~2-5MB for optimal web performance

INPUT_DIR="./src/assets/images/personal"
OUTPUT_DIR="./src/assets/videos"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "🎬 Aggressive Video Compression Script"
echo "======================================"
echo ""

# Find all video files
VIDEOS=$(find "$INPUT_DIR" -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.webm" -o -iname "*.avi" \) 2>/dev/null)

if [ -z "$VIDEOS" ]; then
    echo "❌ No video files found in $INPUT_DIR"
    echo "   Please add your videos to: $INPUT_DIR"
    exit 1
fi

echo "Found video files:"
echo "$VIDEOS" | while read -r video; do
    size=$(ls -lh "$video" | awk '{print $5}')
    echo "  - $(basename "$video") ($size)"
done
echo ""

# Compress each video with aggressive settings
echo "$VIDEOS" | while read -r input_video; do
    filename=$(basename "$input_video")
    name="${filename%.*}"
    output_video="$OUTPUT_DIR/${name}_compressed.mp4"
    
    echo "📹 Aggressively compressing: $filename"
    echo "   Input: $(ls -lh "$input_video" | awk '{print $5}')"
    
    # Aggressive compression settings:
    # -crf 32: Higher compression (lower quality but much smaller)
    # -preset slow: Better compression (takes longer)
    # -vf scale: Limit to 720p for smaller size
    # -r 24: Reduce frame rate to 24fps
    # -movflags +faststart: Enable fast start for web
    # -an: Remove audio
    
    ffmpeg -i "$input_video" \
        -c:v libx264 \
        -crf 32 \
        -preset slow \
        -vf "scale='min(720,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease" \
        -r 24 \
        -movflags +faststart \
        -an \
        -y \
        "$output_video" 2>&1 | grep -E "(Duration|Stream|Output|error)" || true
    
    if [ -f "$output_video" ]; then
        output_size=$(ls -lh "$output_video" | awk '{print $5}')
        echo "   ✅ Output: $output_size"
        echo "   Saved to: $output_video"
    else
        echo "   ❌ Compression failed"
    fi
    echo ""
done

echo "✨ Aggressive compression complete!"
echo ""

