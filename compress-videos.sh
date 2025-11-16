#!/bin/bash

# Video Compression Script for Web Use
# Compresses videos to ~5-10MB for optimal web performance

INPUT_DIR="./src/assets/images/personal"
OUTPUT_DIR="./src/assets/videos"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "🎬 Video Compression Script"
echo "=========================="
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

# Compress each video
echo "$VIDEOS" | while read -r input_video; do
    filename=$(basename "$input_video")
    name="${filename%.*}"
    output_video="$OUTPUT_DIR/${name}_compressed.mp4"
    
    echo "📹 Compressing: $filename"
    echo "   Input: $(ls -lh "$input_video" | awk '{print $5}')"
    
    # Compress with optimized settings for web
    # -crf 28: Good quality with smaller file size (lower = better quality, 23 is default)
    # -preset medium: Balance between speed and compression
    # -vf scale: Limit resolution to 1080p max
    # -movflags +faststart: Enable fast start for web streaming
    # -an: Remove audio (since videos are muted anyway)
    
    ffmpeg -i "$input_video" \
        -c:v libx264 \
        -crf 28 \
        -preset medium \
        -vf "scale='min(1080,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease" \
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

echo "✨ Compression complete!"
echo ""
echo "Next steps:"
echo "1. Check compressed videos in: $OUTPUT_DIR"
echo "2. Update src/portfolio.js with the compressed video paths"
echo ""

