from flask import (Flask, render_template, request, jsonify)
from rdflib import Graph, Literal, RDF, URIRef, Namespace, BNode  # basic RDF handling
from rdflib.namespace import FOAF, XSD, RDFS  # most common namespaces


app = Flask(__name__,
            static_folder='client/build', static_url_path='')

g = Graph()
g.parse('triples.ttl', format='turtle')


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')
    
@app.route("/api/industries")
def industries():
    getIndustries = """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select distinct ?s where { 
	    ?s <http://example.org/applied/> ?o . 
        ?o <http://example.org/industry/> ?i.
    } 
    """
    results = g.query(getIndustries)
    toPass = []
    for row in results:
        toPass.append(row.s)
    return jsonify(toPass)


@app.route("/api/countries")
def countries():
    getCountries = """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select distinct ?s where { 
	    ?s <http://example.org/applied/> ?o . 
        ?o <http://example.org/country/> ?i.
    } 
    """
    results = g.query(getCountries)
    toPass = []
    for row in results:
        toPass.append(row.s)
    return jsonify(toPass)


@app.route("/api/sizes")
def sizes():
    getSizes = """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select distinct ?s where { 
	    ?s <http://example.org/applied/> ?o . 
        ?o <http://example.org/size/> ?i.
    } 
    """
    results = g.query(getSizes)
    toPass = []
    for row in results:
        toPass.append(row.s)
    return jsonify(toPass)


@app.route("/api/applied")
def applied():
    scheme = request.args.get('scheme')
    filter = request.args.get('filter')

    qpart0 = """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select distinct ?s ?value where {  
        ?s <http://example.org/applied/> ?o . 
    """
    qpart1 = '    ?o <http://example.org/name/> "{}"@en. '.format(scheme)

    filterQ = '    ?o <http://example.org/{}/> ?i.'.format(filter)
    qpart2 = """        
        ?o rdf:value ?value    
    } 
    """
    query = qpart0 + qpart1 + filterQ + qpart2
    results = g.query(query)

    toPass = []
    for row in results:
        toPass.append((row.s, row.value))
    return jsonify(toPass)


@app.route("/api/received")
def received():
    scheme = request.args.get('scheme')
    filter = request.args.get('filter')

    qpart0 = """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select distinct ?s ?value where {  
        ?s <http://example.org/received/> ?o . 
    """
    qpart1 = '    ?o <http://example.org/name/> "{}"@en. '.format(scheme)

    filterQ = '    ?o <http://example.org/{}/> ?i.'.format(filter)
    qpart2 = """        
        ?o rdf:value ?value    
    } 
    """
    query = qpart0 + qpart1 + filterQ + qpart2
    results = g.query(query)

    toPass = []
    for row in results:
        toPass.append((row.s, row.value))
    return jsonify(toPass)


@app.route("/api/intending")
def intending():
    scheme = request.args.get('scheme')
    filter = request.args.get('filter')

    qpart0 = """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select distinct ?s ?value where {  
        ?s <http://example.org/intending/> ?o . 
    """
    qpart1 = '    ?o <http://example.org/name/> "{}"@en. '.format(scheme)

    filterQ = '    ?o <http://example.org/{}/> ?i.'.format(filter)
    qpart2 = """        
        ?o rdf:value ?value    
    } 
    """
    query = qpart0 + qpart1 + filterQ + qpart2
    results = g.query(query)

    toPass = []
    for row in results:
        toPass.append((row.s, row.value))
    return jsonify(toPass)


@app.route("/api/trading")
def trading():
    status = request.args.get('status')
    filter = request.args.get('filter')

    qpart0 = """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select distinct ?s ?value where {  
    """
    qpart1 = '    ?s <http://example.org/{}/> ?o . '.format(status)

    filterQ = '    ?o <http://example.org/{}/> ?i.'.format(filter)
    qpart2 = """        
        ?o rdf:value ?value    
    } 
    """
    query = qpart0 + qpart1 + filterQ + qpart2
    results = g.query(query)

    toPass = []
    for row in results:
        toPass.append((row.s, row.value))
    return jsonify(toPass)


@app.route("/api/responses")
def responses():
    size = request.args.get('size')
    filter = request.args.get('filter')

    qpart0 = """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select distinct ?s ?value where {  
        ?s <http://example.org/sample/> ?o . 
    """
    qpart1 = '    ?o <http://example.org/name/> "{}"@en. '.format(size)

    filterQ = '    ?o <http://example.org/{}/> ?i.'.format(filter)
    qpart2 = """        
        ?o rdf:value ?value    
    } 
    """
    query = qpart0 + qpart1 + filterQ + qpart2
    results = g.query(query)

    toPass = []
    for row in results:
        toPass.append((row.s, row.value))
    return jsonify(toPass)


if __name__ == '__main__':
    app.run()
