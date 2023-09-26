import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from '@react-three/drei'


export default function Experience()
{
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
    
    return <>

        <color args={ [ '#000000' ] } attach="background" />

        <Environment preset="city" />
        
        <PresentationControls
            global
            rotation={ [ 0, -0.6, 0 ] }
            polar={ [ - 0.4, 0.2 ] }
            azimuth={ [ - 1, 0.75 ] }
            config={ { mass: 2, tension: 400 } }
            snap={ { mass: 4, tension: 400 } }
        >
            <Float rotationIntensity={ 0.4 } >  
                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 65 }
                    color={ '#ff6900' }
                  
                    rotation={ [ - 0.1, Math.PI, 0 ] }
                    position={ [ 0, 0.55, - 1.15 ] }
                />

                <primitive
                     object={computer.scene}
                     position-y={-1.8}
                     rotation-x={0.0}
                     scale={[1.5, 1.5, 1.5]}
                >
                    <Html
                        transform
                        wrapperClass="htmlScreen"
                        distanceFactor={ 1.17 }
                        position={ [ 0, 1.56, - 1.4 ] }
                        rotation-x={ - 0.256 }
                    >
                        <iframe src="https://windows-mugm.vercel.app/" />
                    </Html>
                </primitive>
                <Text
  font="./bangers-v20-latin-regular.woff"
  fontSize={0.5}
  position={[-2.2, 0.75, 0.75]}
  
  maxWidth={2}
  color={'#FFD700'}
>
   Luciano Mendez
</Text>
<Text
  font="./bangers-v20-latin-regular.woff"
  fontSize={0.2}
  position={[-2.1, -0., 1]}

  maxWidth={2}
  color={'#FFD700'}
>
  Porfolio 3D
</Text>
            </Float>
        </PresentationControls>

        <ContactShadows
            position-y={ - 1.6 }
            opacity={ 0.4 }
            scale={ 5 }
            blur={ 2.4 }
        />

    </>
}