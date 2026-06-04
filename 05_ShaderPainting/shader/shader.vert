// vert file and comments from adam ferriss
// https://github.com/aferriss/p5jsShaderExamples

// our vertex data
attribute vec3 aPosition;

// our texcoordinates
attribute vec2 aTexCoord;

// this is a variable that will be shared with the fragment shader
// we will assign the attribute texcoords to the varying texcoords to move them from the vert shader to the frag shader
// it can be called whatever you want but often people prefiv it with 'v' to indicate that it is a varying
varying vec2 vTexCoord;

void main() {
    
    // copy the texture coordinates
    vTexCoord = aPosition.xy;

    vTexCoord.y = 1.0-vTexCoord.y;
    gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0); 
    
    
}