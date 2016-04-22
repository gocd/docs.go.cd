#!/bin/bash

set -e

file="$(pwd)/concepts.svg"
output_dir="$(pwd)/output"
layer_to_generate_image_for="${1:-.*}"

mkdir -p "${output_dir}"

count=0
grep 'inkscape:label="layer_' "${file}" | sed -e 's/\s*inkscape:label="layer_\([^"]*\)"/\1/' | tac | grep "${layer_to_generate_image_for}" | while read layer; do
    count=$((count + 1))
    zero_padded_count="$(printf '%02d' "${count}")"
    final_filename="${zero_padded_count}_${layer}.png"

    /Applications/Inkscape.app/Contents/Resources/bin/inkscape \
        --file="${file}" --export-png="${output_dir}/orig_${final_filename}" \
        --export-id-only --export-id=layer_$layer --export-dpi 256;

    convert -resize '1440>' -quality 80% "${output_dir}/orig_${final_filename}" "${output_dir}/${final_filename}"
    optipng -o9 "${output_dir}/${final_filename}"

    /bin/rm -f "${output_dir}/orig_${final_filename}"
done
