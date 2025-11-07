#gunakan node js versi 18
FROM node:18-alpine

#buat direktori kerja di dalam container
WORKDIR /app

#salin file package.json dan package-lock.json ke dalam container
COPY package.json . /app/



#install dependencies aplikasi
RUN npm install

#salin semua file aplikasi ke dalam container
COPY . .

#expose port 3000 untuk diakses dari luar container
EXPOSE 3000

#jalankan aplikasi
CMD ["npm", "start"]
