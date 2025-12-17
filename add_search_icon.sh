#!/bin/bash

# Script to add search icon before ShopBag link in all HTML files

# Define the search icon HTML
SEARCH_ICON='          <a
            href="Search.html"
            class="text-[#e8e8ed] hover:text-blue-400 transition-colors"
            title="AI 找人"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </a>'

# Find all HTML files containing ShopBag.html
find . -name "*.html" -type f | while read file; do
    # Check if file contains ShopBag.html
    if grep -q "ShopBag.html" "$file"; then
        echo "Processing: $file"

        # Create a temporary file
        temp_file=$(mktemp)

        # Process the file line by line
        while IFS= read -r line; do
            # Check if this line contains the ShopBag link opening tag
            if echo "$line" | grep -q '<a.*href="ShopBag.html".*class=".*relative group"'; then
                # Insert search icon before this line
                echo "$SEARCH_ICON"
            fi
            # Always output the current line
            echo "$line"
        done < "$file" > "$temp_file"

        # Replace original file with modified version
        mv "$temp_file" "$file"
    fi
done

echo "Done!"
