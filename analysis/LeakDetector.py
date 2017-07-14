from urlparse import urlparse
from Crypto.Hash import MD2
import cookies as ck
import hackercodecs  # noqa
import hashlib
import pyblake2
import urllib
import sha3
import mmh3
import mmhash
import base64
import base58
import zlib
import json
import re

DELIMITERS = re.compile('[&|\,_]')
EXTENSION_RE = re.compile('\.[A-Za-z]{2,4}')
ENCODING_LAYERS = 3
ENCODINGS_NO_ROT = ['base16', 'base32', 'base58', 'base64',
                    'urlencode', 'yenc', 'entity',
                    'deflate', 'zlib', 'gzip']
LIKELY_ENCODINGS = ['base16', 'base32', 'base58', 'base64',
                    'urlencode', 'yenc', 'entity']


class Hasher():
    def __init__(self):
        # Define Supported hashes
        hashes = dict()
        hashes['md2'] = lambda x: self._get_md2_hash(x)
        hashes['md4'] = lambda x: self._get_hashlib_hash('md4', x)
        hashes['md5'] = lambda x: hashlib.md5(x).hexdigest()
        hashes['sha'] = lambda x: self._get_hashlib_hash('sha', x)
        hashes['sha1'] = lambda x: hashlib.sha1(x).hexdigest()
        hashes['sha256'] = lambda x: hashlib.sha256(x).hexdigest()
        hashes['sha224'] = lambda x: hashlib.sha224(x).hexdigest()
        hashes['sha384'] = lambda x: hashlib.sha384(x).hexdigest()
        hashes['sha512'] = lambda x: hashlib.sha512(x).hexdigest()
        hashes['sha3_224'] = lambda x: sha3.sha3_224(x).hexdigest()
        hashes['sha3_256'] = lambda x: sha3.sha3_256(x).hexdigest()
        hashes['sha3_384'] = lambda x: sha3.sha3_384(x).hexdigest()
        hashes['sha3_512'] = lambda x: sha3.sha3_512(x).hexdigest()
        hashes['mmh2'] = lambda x: str(mmhash.get_hash(x))
        hashes['mmh2_unsigned'] = lambda x: str(mmhash.get_unsigned_hash(x))
        hashes['mmh3_32'] = lambda x: str(mmh3.hash(x))
        hashes['mmh3_64_1'] = lambda x: str(mmh3.hash64(x)[0])
        hashes['mmh3_64_2'] = lambda x: str(mmh3.hash64(x)[1])
        hashes['mmh3_128'] = lambda x: str(mmh3.hash128(x))
        hashes['ripemd160'] = lambda x: self._get_hashlib_hash('ripemd160', x)
        hashes['whirlpool'] = lambda x: self._get_hashlib_hash('whirlpool', x)
        hashes['blake2b'] = lambda x: pyblake2.blake2b(x).hexdigest()
        hashes['blake2s'] = lambda x: pyblake2.blake2s(x).hexdigest()
        hashes['crc32'] = lambda x: str(zlib.crc32(x))
        hashes['adler32'] = lambda x: str(zlib.adler32(x))

        self._hashes = hashes
        self.hashes_and_checksums = self._hashes.keys()
        self.supported_hashes = self._hashes.keys()
        self.supported_hashes.remove('crc32')
        self.supported_hashes.remove('adler32')

    def _get_hashlib_hash(self, name, string):
        """Use for hashlib hashes that don't have a shortcut"""
        hasher = hashlib.new(name)
        hasher.update(string)
        return hasher.hexdigest()

    def _get_md2_hash(self, string):
        """Compute md2 hash"""
        md2 = MD2.new()
        md2.update(string)
        return md2.hexdigest()

    def get_hash(self, hash_name, string):
        """Compute the desired hash"""
        return self._hashes[hash_name](string)


class Encoder():
    def __init__(self):
        # Define supported encodings
        encodings = dict()
        encodings['base16'] = lambda x: base64.b16encode(x)
        encodings['base32'] = lambda x: base64.b32encode(x)
        encodings['base58'] = lambda x: base58.b58encode(x)
        encodings['base64'] = lambda x: base64.b64encode(x)
        encodings['urlencode'] = lambda x: urllib.quote_plus(x)
        encodings['deflate'] = lambda x: self._compress_with_zlib('deflate', x)
        encodings['zlib'] = lambda x: self._compress_with_zlib('zlib', x)
        encodings['gzip'] = lambda x: self._compress_with_zlib('gzip', x)
        encodings['json'] = lambda x: json.dumps(x)
        encodings['binary'] = lambda x: x.encode('bin')
        encodings['entity'] = lambda x: x.encode('entity')
        encodings['rot1'] = lambda x: x.encode('rot1')
        encodings['rot10'] = lambda x: x.encode('rot10')
        encodings['rot11'] = lambda x: x.encode('rot11')
        encodings['rot12'] = lambda x: x.encode('rot12')
        encodings['rot13'] = lambda x: x.encode('rot13')
        encodings['rot14'] = lambda x: x.encode('rot14')
        encodings['rot15'] = lambda x: x.encode('rot15')
        encodings['rot16'] = lambda x: x.encode('rot16')
        encodings['rot17'] = lambda x: x.encode('rot17')
        encodings['rot18'] = lambda x: x.encode('rot18')
        encodings['rot19'] = lambda x: x.encode('rot19')
        encodings['rot2'] = lambda x: x.encode('rot2')
        encodings['rot20'] = lambda x: x.encode('rot20')
        encodings['rot21'] = lambda x: x.encode('rot21')
        encodings['rot22'] = lambda x: x.encode('rot22')
        encodings['rot23'] = lambda x: x.encode('rot23')
        encodings['rot24'] = lambda x: x.encode('rot24')
        encodings['rot25'] = lambda x: x.encode('rot25')
        encodings['rot3'] = lambda x: x.encode('rot3')
        encodings['rot4'] = lambda x: x.encode('rot4')
        encodings['rot5'] = lambda x: x.encode('rot5')
        encodings['rot6'] = lambda x: x.encode('rot6')
        encodings['rot7'] = lambda x: x.encode('rot7')
        encodings['rot8'] = lambda x: x.encode('rot8')
        encodings['rot9'] = lambda x: x.encode('rot9')
        encodings['yenc'] = lambda x: x.encode('yenc')
        self._encodings = encodings
        self.supported_encodings = self._encodings.keys()

    def _compress_with_zlib(self, compression_type, string, level=6):
        """Compress in one of the zlib supported formats: zlib, gzip, or deflate.
        For a description see: http://stackoverflow.com/a/22311297/6073564
        """
        if compression_type == 'deflate':
            compressor = zlib.compressobj(level, zlib.DEFLATED,
                                          -zlib.MAX_WBITS)
        elif compression_type == 'zlib':
            compressor = zlib.compressobj(level, zlib.DEFLATED,
                                          zlib.MAX_WBITS)
        elif compression_type == 'gzip':
            compressor = zlib.compressobj(level, zlib.DEFLATED,
                                          zlib.MAX_WBITS | 16)
        else:
            raise ValueError("Unsupported zlib compression format %s." %
                             compression_type)
        return compressor.compress(string) + compressor.flush()

    def encode(self, encoding, string):
        """Encode `string` in desired `encoding`"""
        return self._encodings[encoding](string)


class DecodeException(Exception):
    def __init__(self, message, error):
        super(DecodeException, self).__init__(message)
        self.error = error


class Decoder():
    def __init__(self):
        # Define supported encodings
        encodings = dict()
        encodings['base16'] = lambda x: base64.b16decode(x)
        encodings['base32'] = lambda x: base64.b32decode(x)
        encodings['base58'] = lambda x: base58.b58decode(x)
        encodings['base64'] = lambda x: base64.b64decode(x)
        encodings['urlencode'] = lambda x: urllib.unquote_plus(x)
        encodings['deflate'] = lambda x: self._decompress_with_zlib('deflate',
                                                                    x)
        encodings['zlib'] = lambda x: self._decompress_with_zlib('zlib', x)
        encodings['gzip'] = lambda x: self._decompress_with_zlib('gzip', x)
        encodings['json'] = lambda x: json.loads(x)
        encodings['binary'] = lambda x: x.decode('bin')
        encodings['entity'] = lambda x: x.decode('entity')
        encodings['rot1'] = lambda x: x.decode('rot1')
        encodings['rot10'] = lambda x: x.decode('rot10')
        encodings['rot11'] = lambda x: x.decode('rot11')
        encodings['rot12'] = lambda x: x.decode('rot12')
        encodings['rot13'] = lambda x: x.decode('rot13')
        encodings['rot14'] = lambda x: x.decode('rot14')
        encodings['rot15'] = lambda x: x.decode('rot15')
        encodings['rot16'] = lambda x: x.decode('rot16')
        encodings['rot17'] = lambda x: x.decode('rot17')
        encodings['rot18'] = lambda x: x.decode('rot18')
        encodings['rot19'] = lambda x: x.decode('rot19')
        encodings['rot2'] = lambda x: x.decode('rot2')
        encodings['rot20'] = lambda x: x.decode('rot20')
        encodings['rot21'] = lambda x: x.decode('rot21')
        encodings['rot22'] = lambda x: x.decode('rot22')
        encodings['rot23'] = lambda x: x.decode('rot23')
        encodings['rot24'] = lambda x: x.decode('rot24')
        encodings['rot25'] = lambda x: x.decode('rot25')
        encodings['rot3'] = lambda x: x.decode('rot3')
        encodings['rot4'] = lambda x: x.decode('rot4')
        encodings['rot5'] = lambda x: x.decode('rot5')
        encodings['rot6'] = lambda x: x.decode('rot6')
        encodings['rot7'] = lambda x: x.decode('rot7')
        encodings['rot8'] = lambda x: x.decode('rot8')
        encodings['rot9'] = lambda x: x.decode('rot9')
        encodings['yenc'] = lambda x: x.decode('yenc')
        self._encodings = encodings
        self.supported_encodings = self._encodings.keys()

    def _decompress_with_zlib(self, compression_type, string, level=9):
        """Compress in one of the zlib supported formats: zlib, gzip, or deflate.
        For a description see: http://stackoverflow.com/a/22311297/6073564
        """
        if compression_type == 'deflate':
            return zlib.decompress(string, -zlib.MAX_WBITS)
        elif compression_type == 'zlib':
            return zlib.decompress(string, zlib.MAX_WBITS)
        elif compression_type == 'gzip':
            return zlib.decompress(string, zlib.MAX_WBITS | 16)
        else:
            raise ValueError("Unsupported zlib compression format %s." %
                             compression_type)

    def decode_error(self):
        """Catch-all error for all supported decoders"""

    def decode(self, encoding, string):
        """Encode `string` in desired `encoding`"""
        try:
            return self._encodings[encoding](string)
        except Exception as e:
            raise DecodeException(
                'Error while trying to apply encoding %s' % encoding,
                e
            )


class LeakDetector():
    def __init__(self, search_strings, precompute_hashes=True, hash_set=None,
                 hash_layers=2, precompute_encodings=True, encoding_set=None,
                 encoding_layers=2):
        """LeakDetector searches URL, POST bodies, and cookies for leaks.

        The detector is constructed with a set of search strings (given by
        the `search_strings` parameters. It has several methods to check for
        leaks containing these strings in URLs, POST bodies, and cookie header
        strings.

        Parameters
        ==========
        search_strings : list
            LeakDetector will search for leaks containing any item in this list
        precompute_hashes : bool
            Set to `True` to include precomputed hashes in the candidate set.
        hash_set : list
            List of hash functions to use when building the set of candidate
            strings.
        hash_layers : int
            The detector will find instances of `search_string` iteratively
            hashed up to `hash_layers` times by any combination of supported
            hashes.
        precompute_encodings : bool
            Set to `True` to include precomputed encodings in the candidate set
        encoding_set : list
            List of encodings to use when building the set of candidate
            strings.
        encoding_layers : int
            The detector will find instances of `search_string` iteratively
            encoded up to `encoding_layers` times by any combination of
            supported encodings.
        """
        self.search_strings = search_strings
        self._min_length = min([len(x) for x in search_strings])
        self._hasher = Hasher()
        self._hash_set = hash_set
        self._hash_layers = hash_layers
        self._encoder = Encoder()
        self._encoding_set = encoding_set
        self._encoding_layers = encoding_layers
        self._decoder = Decoder()
        self._precompute_pool = dict()
        self._build_precompute_pool(precompute_hashes, precompute_encodings)

        # If hash/encoding sets aren't specified, use all available.
        if self._hash_set is None:
            self._hash_set = self._hasher.supported_hashes
        if self._encoding_set is None:
            self._encoding_set = self._encoder.supported_encodings

    def _compute_hashes(self, string, layers, prev_hashes=tuple()):
        """Returns all iterative hashes of `string` up to the
        specified number of `layers`"""
        for h in self._hasher.supported_hashes:
            hashed_string = self._hasher.get_hash(h, string)
            if hashed_string == string:  # skip no-ops
                continue
            hash_stack = (h,) + prev_hashes
            self._precompute_pool[hashed_string] = hash_stack
            if layers > 1:
                self._compute_hashes(hashed_string, layers-1, hash_stack)

    def _compute_encodings(self, string, layers, prev_encodings=tuple()):
        """Returns all iterative encodings of `string` up to the
        specified number of `layers`"""
        for enc in self._encoding_set:
            encoded_string = str(self._encoder.encode(enc, string))
            if encoded_string == string:  # skip no-ops
                continue
            encoding_stack = (enc,) + prev_encodings
            self._precompute_pool[encoded_string] = encoding_stack
            if layers > 1:
                self._compute_encodings(encoded_string, layers-1,
                                        encoding_stack)

    def _build_precompute_pool(self, precompute_hashes, precompute_encodings):
        """Build a pool of hashes for the given search string"""
        strings = list()
        for string in self.search_strings:
            strings.append(string)
            if '@' in string:
                strings.append(string.rsplit('.', 1)[0])
                parts = string.rsplit('@')
                strings.append(parts[0])
                # Domain searches have too many false positives
                # strings.append(parts[1])
                # strings.append(parts[1].rsplit('.', 1)[0])
        for string in strings:
            self._precompute_pool[string] = (string,)
        self._min_length = min([len(x) for x in self._precompute_pool.keys()])
        initial_items = self._precompute_pool.items()
        if precompute_hashes:
            for string, name in initial_items:
                self._compute_hashes(string, self._hash_layers, name)
        if precompute_encodings:
            for string, name in initial_items:
                self._compute_encodings(string, self._encoding_layers, name)

    def _split_on_delims(self, string, rv_parts, rv_named):
        """Splits a string on several delimiters"""
        if string == '':
            return
        parts = set(re.split(DELIMITERS, string))
        if '' in parts:
            parts.remove('')
        for part in parts:
            if part == '':
                continue
            count = part.count('=')
            if count != 1:
                rv_parts.add(part)
            if count == 0:
                continue
            n, k = part.split('=', 1)
            if len(n) > 0 and len(k) > 0:
                rv_named.add((n, k))
            else:
                rv_parts.add(part)

    def check_if_in_precompute_pool(self, string):
        """Returns a tuple that lists the (possibly layered) hashes or
        encodings that result in input string
        """
        try:
            return self._precompute_pool[str(string)]
        except KeyError:
            return
        except (UnicodeDecodeError, UnicodeEncodeError):
            return

    def check_for_leak(self, string, layers=1, prev_encodings=tuple(),
                       prev=''):
        """Check if given string contains a leak"""
        # Short tokens won't contain email address
        if len(string) < self._min_length:
            return

        # Check if direct hash or plaintext
        rv = self.check_if_in_precompute_pool(string)
        if rv is not None:
            return prev_encodings + rv

        # Try encodings
        for encoding in self._encoding_set:
            # multiple rots are unnecessary
            if encoding.startswith('rot') and prev.startswith('rot'):
                continue
            try:
                decoded = self._decoder.decode(encoding, string)
                if type(decoded) == int or type(decoded) == long:
                    decoded = str(decoded)
            except DecodeException:  # means this isn't the correct decoding
                continue
            if decoded == string:  # don't add no-ops
                continue
            if decoded is None:  # Empty decodings aren't useful
                continue
            encoding_stack = prev_encodings + (encoding,)
            if layers > 1:
                rv = self.check_for_leak(decoded, layers-1,
                                         encoding_stack, encoding)
                if rv is not None:
                    return rv
            else:
                rv = self.check_if_in_precompute_pool(decoded)
                if rv is not None:
                    return encoding_stack + rv
        return

    def _check_parts_for_leaks(self, tokens, parameters, nlayers):
        """Check token and parameter string parts for leaks"""
        leaks = list()
        for token in tokens:
            leak = self.check_for_leak(token, layers=nlayers)
            if leak is not None:
                leaks.append(leak)
        for name, value in parameters:
            leak = self.check_for_leak(value, layers=nlayers)
            if leak is not None:
                leaks.append(leak)
            leak = self.check_for_leak(name, layers=nlayers)
            if leak is not None:
                leaks.append(leak)
        return leaks

    def _split_url(self, url):
        """Split url path and query string on delimiters"""
        tokens = set()
        parameters = set()
        purl = urlparse(url)
        path_parts = purl.path.split('/')
        for part in path_parts:
            p = re.sub(EXTENSION_RE, '', part)
            self._split_on_delims(p, tokens, parameters)
        self._split_on_delims(purl.query, tokens, parameters)
        self._split_on_delims(purl.fragment, tokens, parameters)
        return tokens, parameters

    def check_url(self, url, encoding_layers=3):
        """Check if a given url contains a leak"""
        tokens, parameters = self._split_url(url)
        return self._check_parts_for_leaks(tokens, parameters, encoding_layers)

    def _get_cookie_str(self, header_str):
        """Returns the `Cookie` header string parsed from `header_str`"""
        for item in json.loads(header_str):
            if item[0] == 'Cookie':
                return item[1]
        return

    def _split_cookie(self, header_str):
        """Returns all parsed parts of the cookie names and values"""
        cookie_str = self._get_cookie_str(header_str)
        if cookie_str is None:
            return
        try:
            cookies = ck.Cookies.from_request(cookie_str)
        except (ck.InvalidCookieError, UnicodeDecodeError):
            return
        tokens = set()
        parameters = set()
        for cookie in cookies.values():
            self._split_on_delims(cookie.name, tokens, parameters)
            self._split_on_delims(cookie.value, tokens, parameters)
        return tokens, parameters

    def check_cookies(self, header_str, encoding_layers=3):
        """Check the cookies portion of the header string for leaks"""
        if header_str == '':
            return list()
        rv = self._split_cookie(header_str)
        if rv is None:
            return list()
        tokens, parameters = rv
        return self._check_parts_for_leaks(tokens, parameters, encoding_layers)

    def substring_search(self, input_string, max_layers=None):
        """Do a substring search for all precomputed hashes/encodings

        `max_layers` limits the number of encoding/hashing layers used in the
        substring search (to limit time). The default is no limit (`None`).
        """
        if input_string is None or input_string == '':
            return list()
        try:
            input_string = input_string.encode('utf8')
        except (UnicodeDecodeError, UnicodeEncodeError):
            print "ERROR encoding %s" % input_string
            return list()
        leaks = list()
        for string, transform_stack in self._precompute_pool.items():
            if max_layers and len(transform_stack) > (max_layers + 1):
                continue
            if string in input_string:
                leaks.append(transform_stack)
        return leaks
