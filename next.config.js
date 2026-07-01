/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
'''

with open(f"{output_dir}/next.config.js", "w") as f:
    f.write(next_config)
