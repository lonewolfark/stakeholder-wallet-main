const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
'''

with open(f"{output_dir}/postcss.config.mjs", "w") as f:
    f.write(postcss_config)
