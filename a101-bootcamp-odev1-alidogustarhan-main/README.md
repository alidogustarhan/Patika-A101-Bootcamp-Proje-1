
Projemde mongoDB kullandım. Projenin çalışması için  mongoDB baglantısı gereklidir .(DOSYALAR NODE.JS İLE SUNUCU AYAĞA KALDIRMA ÖDEVİNE AİT)
Çalıştırdıktan sonra "söz ver" sekmesine gidip yeni bir söz eklediğimizde o söz bizim web sitemizin ana sayfasına eklenmiş olacaktır.
GET ve POST kodları app.js içerisindedir

"Neden TS kullanmalıyız" ödevini de yazılı olarak bu dosyada sundum.

--------------------------------------------------------------

<h1> Neden TS Kullanalım ? </h1>

<h3>TS TYPE</h3>

TS ile çalışırken hatalarımızı daha programı compile etmeden görme şansı buluruz. Buna compile time error denir ve geliştirme aşamasındayken hataları görüp düzelttiğimiz için dosyamızı da korumuş olur.

İlgili kodlarımızı TS uzantılı dosyada yazdıktan sonra terminale tsc dosyaadı şeklinde yazdığımızda bizim kodlarımızı JS uzantılı koda dönüştürür.Artık JS uzantılı dosyamızı node dosyaadı şeklinde yazarak çalıştırabiliriz.
---------------------------------------------------------------------------------

    let number = 5 ;
    number = 'a';

----------------------------------------------------------------------------------

Biz biliyoruz ki JS de bir değişkene değer atadığımız zaman diğer programlama dillerinde olduğu gibi number,string,boolean ... şeklinde bir tip ayrımı yapmaz. İşte bu noktada yukarıdaki örnekte number değişkenini biz proje tasarım aşamasında type number olarak tasarladıysak JS kısmında yapacağımız bu yeni atama hatasında PROGRAM HATA VERMEZ.Bu noktada program için bu bir hata değildir ama projemiz için büyük bir hatadır.

    let ali: number = 5;

TS kullanımında bu şekilde type belirleyebiliriz. Bu noktada belirlediğim number type hiçbir zaman başka type olarak değiştirilemez. TS burada hata verir. 

ÖRNEKLER
 ----------------------------------------------------------------
     let b1: string = 'a';
     let c1: boolean = true;
     let d1: any;
     let e1: number[] = [1,2,3];
     let f1: Array<number> = [1,2,3];
     
Görüldüğü üzere bu şekilde type ı belirli atmamalar yapabilmekteyiz.

----------------------------------------------------------------

<h3> TS Functions </h3>

Fonksiyonlarda TS kullanmanın avantajlarını açıklayalım. JS üzerinde 

        const sum=(a,b,c) => {
             return a+b+c
         }

şeklinde basit bir fonksiyon yazmıs olalım.Bu noktada fonksiyonu kullanan kişi sum(10,20,25) şeklinde number türünde parametreler girerse fonksiyon çalışacaktır. Peki ya string girerse??? Bu noktada JS yetersiz kalır. Ancak TS ile bunları engellediğimiz bir fonksiyon yazabiliriz.


    const getAverage1 = (...a: number[]): string => {
    let total = 0;
    let count = 0;

    for (let i = 0; i < a.length; i++) {
        total += a[i];
        count++;
    }

    const result = total / count;
    return 'result : ' + result;


     getAverage1(10, 20, 30);
     getAverage1(10, 20, 30, 50);
     getAverage1(10, 20);
     getAverage1(10);

Görüldüğü üzere fonksiyonumuz içerisine SADECE NUMBER TİPİNDE olabilen bir dizi alarak çalışıyor. Return olarak döneceği değeri de string olarak belirledik. Şuan kullanıcı parametreler yerine number dışında bir parametre girdiği anda program hata verecektir.

------------------------------------------------
 Bu konunun ne kadar büyük problem oluşturabileceğini başka bir örnekle yazalım.


         function add(num1,num2){
             return num1+num2;
         }
Bu fonksiyon JS standartlarında yazılmıstır ve olası kullanıcı ihtimallerine bir  bakalım.

       add("2","5")----->Sorunsuz çalışır ve SONUÇ 25 çünkü string toplaması yaptı.

       add(2,5)----->Sorunsuz çalışır ve SONUÇ 7 çünkü number toplaması yaptı.

JS için ortada hiçbir sorun yok ancak biz oldukça büyük bir sorun ile karşı karşıyayız ve bunun farkına varamayabiliriz.

TS İLE HALLEDELİM.

     function add(num1:number,num2:number){
             return num1+num2;
         }

Artık hata şansımız kalmadı.

----------------------------------------------------------
<h3> TS Interface </h3>


TS de çalışırken JS in aksine biz çok detaylı type ataması yapabiliriz. Interface adlı yapılarda oluşturduğumuz bu düzen adeta programımızın hangi türlerden oluşması gerektiğini söyleyen hatta kaç parametre alması gerektiğini söyleyen bir tür filtresi gibi çalışır.Bu bakımda TS ile çalışırken istemediğimiz tür dönüşümleri hatta ve hatta istemediğimiz değişkene erişmelerini bile engelleyebiliriz.


       interface Point {
           x: number,
           y: number
       }

        interface Vehicle {
            travelTo(point: Point): void;

        }

      class Taxi implements Vehicle {  
    
    constructor(private _location?: Point, private _color?: string) {  }
   
    travelTo(point: Point): void {
        console.log(`taksi X: ${this._location.x} Y: ${this._location.y} dan X: ${point.x} Y: ${point.y} konumuna gidiyor.`);
    }

    get location() {
        return this._location;
    }

    set location(value: Point) {
        if(value.x<0 || value.y <0) {
            throw new Error('koordinat bilgileri negatif olamaz');
        }
        this._location = value;
    }
}

-----------------------------------------
Görüldüğü üzere Point adında bir interface tanımladık ve bunu Vehicle interfacesinde kullandık. Burada travelTo adlı bir fonksiyon oluşturduk ve içerisine alacagı parametrelerin türünü ve adetini Point interfacesine bağlı kıldık.
implements ile Vehicle interfacesini Taxi Class ına implement ettik.
 Burada Taxi class ımızın kendine has constructor yapısını oluşturduk. Görüldüğü üzere içerisine alacağı parametreleri Point interfacesine bağımlı kıldık. _location parametresine bakarsak 2 değer almak zorundadır ve ikisi de number olmak zorundadır.
 Vehicle interfacesinden çektiğimiz kısım burası ve Vehicle Point interfacesine bağlı olduğu için sarmal bir şekilde Taxi class ım da Point interfacesine bağlı oldu.


----------------------------------------
Interface kullanımının TS deki ayrıcalığını gördük. Şimdi başka bir önemli noktaya değinelim.Biz yazdığımız class ların dışarıdan erişiminin olmasını istemeyiz. Örnek verecek olursak _location parametresine dışarıdan ulaşıp x ve y değerlerini atayamamalıyız.Bu noktada JS DE OLMAYAN AMA TS DE OLAN bir özellik devreye giriyor. _location parametresinin önüne private yazdık. Bu sayede artık class dışından hiçbir şekilde bu parametreye erişemeyiz.

Peki nasıl erişeceğiz??? Burada bir fonksiyon yazarak (CLASS IN İÇİNDE BİR FONKSİYON) önce classın içinde bu yazmış olduğunuz fonksiyona erişirsiniz o da sizin yerinize gidip _location a ulaşır ve ilgili değişikliği yapabilirsiniz.

Ancak biz burada get ve set kullandık. Ulaşmak istediğimiz parametreye get ve set ile işlemler atadık. Bu sayede değişkenimize dışarıdan erişilmesine izin verdik. Ancak set tarafına dikkat edersek kulanıcı taraflı eksi koordinat girme ihtimali hatalarını ortadan kaldırdık.

     let taxi_1;
     let currentLocation = taxi_1.location;
     taxi_1.location = { x: 2, y: 5 };

Artık parametrelerimize get ve set sayesinde erişebiliriz.





