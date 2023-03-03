import os

class Setter:
    file_path = os.path.join(os.pardir, '../', 'project' ,'autobuild', 'src')

    @classmethod
    def json_to_react_pages(cls, json: dict) -> bool:
        """
        Convert JSON to React pages
        """
        for page_name, page_data in json.items():
            page_data: str = "\n".join(page_data)
            if '/' in page_name:
                folder_path = os.path.join(cls.file_path, *os.path.split(os.path.dirname(page_name)))
            else:
                folder_path = cls.file_path
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)
            temp_file_path = os.path.join(folder_path, os.path.basename(page_name))
            #print(temp_file_path)
            with open(temp_file_path, "w") as file:
                #print(file)
                file.write(page_data)

        return True

if __name__ == "__main__":
    Setter.file_path = os.path.join(os.pardir, '../../', 'project' ,'autobuild', 'src')
    test_json = {
        "test.js": [
            "import React from 'ract';",
            "import ReactDOM from 'react-dom';",
            "import App from './App';",
            "import './index.css';",
            "import * as serviceWorker from './serviceWorker';",
            "ReactDOM.render(<App />, document.getElementById('root'));",
            "serviceWorker.unregister();",
        ],
        "test/test2.js": [
            "import React from 'ract';",
            "import ReactDOM from 'react-dom';",
        ]
    }
    print(Setter.json_to_react_pages(test_json))