# servidor.py
from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import shutil


app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'projects'
ALLOWED_EXTENSIONS = {'json', 'rust'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and filename.split('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def home():
    return "Servidor de archivos JSON y Rust"

@app.route('/files/<project_id>')
# Nueva ruta para listar archivos dentro de una carpeta
@app.route('/files/<project_id>/<folder_id>')
def list_project_files(project_id, folder_id=None):
    def list_files_recursively(folder_path):
        file_data = []
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            if os.path.isfile(file_path):
                try:
                    with open(file_path, 'r', encoding='utf-8') as file:
                        content = file.read()
                    file_data.append(
                        {"name": filename, "content": content, "path": folder_path, "extension": filename.split('.')[-1]})
                except Exception as error:
                    print(f'Error reading file "{filename}": {str(error)}')
            elif os.path.isdir(file_path):
                # Si es una carpeta, llama a la función recursivamente para listar sus contenidos
                file_data.append({"name": filename, "is_folder": True,
                                 "path": folder_path, "content": list_files_recursively(file_path)})
        return file_data

    project_folder = os.path.join(app.config['UPLOAD_FOLDER'], project_id)

    if folder_id:
        project_folder = os.path.join(project_folder, folder_id)

    file_data = list_files_recursively(project_folder)

    return jsonify({"files": file_data})


# Nueva ruta para crear una carpeta
@app.route('/create-folder/<path:folder_path>', methods=['POST'])
def create_folder(folder_path):

    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        return jsonify({"message": "Carpeta creada con éxito"}), 200
    else:
        os.makedirs(folder_path + '-2')
        return jsonify({"message": "Carpeta creada con éxito"}), 200


# Nueva ruta para eliminar una carpeta
@app.route('/delete-folder/<project_id>/<folder_id>', methods=['DELETE'])
def delete_folder(project_id, folder_id):
    project_folder = os.path.join(app.config['UPLOAD_FOLDER'], project_id)

    # Si folder_id se proporciona, concaténalo para identificar la carpeta
    if folder_id:
        project_folder = os.path.join(project_folder, folder_id)

    if os.path.exists(project_folder):
        shutil.rmtree(project_folder)
        return jsonify({"message": "Carpeta eliminada con éxito"}), 200
    else:
        return jsonify({"error": "La carpeta no existe"}), 404


@app.route('/handle-file/<path:file_path>', methods=['GET', 'POST', 'DELETE', 'PUT'])
def handle_file(file_path):
    if not os.path.exists(file_path):
        return jsonify({"error": "El proyecto no existe"}), 404

    if request.method == 'GET':
        return jsonify({"message": "test"}), 200

    elif request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({"error": "No se encontró el archivo en la solicitud"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No se seleccionó ningún archivo"}), 400

        file.save(os.path.join(file_path, file.filename))
        return jsonify({"message": "Archivo cargado con éxito"}), 200

    elif request.method == 'DELETE':
        try:
            if os.path.isdir(file_path):
                shutil.rmtree(file_path)
            else:
                os.remove(file_path)
            return jsonify({"message": f"Archivo {file_path} eliminado con éxito"}), 200
        except FileNotFoundError:
            return jsonify({"error": "El archivo no se encuentra"}), 404

    elif request.method == 'PUT':
        new_filename = request.form.get('new_filename')
        if new_filename:
            new_file_path = os.path.join(
                os.path.dirname(file_path), new_filename)
            if os.path.exists(file_path):
                os.rename(file_path, new_file_path)
                return jsonify({"message": "Archivo renombrado con éxito"}), 200
            else:
                return jsonify({"error": "El archivo no existe"}), 404
        else:
            return jsonify({"error": "Se requiere el nuevo nombre del archivo para la actualización"}), 400
@app.route('/checkId/<project_id>')
def checkId(project_id):
    project_folder = os.path.join(app.config['UPLOAD_FOLDER'], project_id)
    exists = os.path.exists(project_folder)
    return jsonify({"exists": exists})


@app.route('/newId/<project_id>')
def create_new_project_folder(project_id):
    project_folder = os.path.join(app.config['UPLOAD_FOLDER'], project_id)

    if os.path.exists(project_folder):
        return jsonify({"error": "El proyecto ya existe"}), 400

    os.makedirs(project_folder)

    return jsonify({"message": "Proyecto creado con éxito"}), 200


if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
