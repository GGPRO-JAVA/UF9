# 3. Manejar excepcions (try - catch - finally)

## 3.1. Manejadors d'excepcions

A Java es poden manejar excepcions utilitzant tres mecanismes anomenats **manejadors d'excepcions**. Existeixen tres i funcionen conjuntament:

- Bloc `try` (intentar): codi que podria llançar una excepció.
- Bloc `catch` (capturar): codi que manejarà l'excepció si és llançada.
- Bloc `finally` (finalment): codi que s'executa tant si hi ha excepció com si no.

>[!IMPORTANT] <strong>IMPORTANT!:</strong>
>Un **manejador d'excepcions** és un bloc de codi encarregat de tractar les excepcions per a intentar recuperar-se de l’error i **evitar que l'excepció siga llançada descontroladament fins al main i acabe el programa**.

Sempre que s'utilitze un **try** és obligatori utilitzar almenys un **catch**. El **finally** és opcional.

```java
try {
    // Instruccions que podrien llançar una excepció.
}
catch (TipusExcepcio nomVariable) {
    // Instruccions que s'executen quan ‘try’ llança una excepció.
}
finally {
    // Instruccions que s'executen tant si hi ha excepció com si no.
}
```

**El bloc try intentarà executar el codi**. Si es produeix una excepció s'abandona aquest bloc (no s'executaran les altres instruccions del try) i se saltarà al bloc catch. Lògicament, si en el try no es produeix cap excepció el bloc catch s'ignora.

**El bloc catch capturarà les excepcions** del tipus <i>TipusExcepcio</i>, evitant que siga llançada al mètode que ens va cridar. Ací haurem d'escriure les instruccions que siguen necessàries per a manejar l'error. Poden especificar-se diversos blocs catch per a diferents tipus d'excepcions.

**El bloc finally és opcional** i s'executarà tant si s'ha llançat una excepció com si no.

Vegem un exemple senzill.

## 3.2. Exemple 4

```java
public static void main(String args[]){
  int x = 1, y = 0;
  try{
    int div = x / y;
    System.out.println("L'execució no arribarà ací.");
  }catch(ArithmeticException e){
    System.out.println("Has intentat dividir entre 0.");
  }finally{
    System.out.println("Final del programa.");
  }
}
```

I l'eixida:

```plaintext
Has intentat dividir entre 0.
Final del programa.
```

Al intentar dividir per zero es llança automàticament una ArithmeticException. Com això succeeix dins del bloc try, l'execució del programa passa al primer bloc catch perquè coincideix amb el tipus d'excepció produïda (ArithmeticException). S'executarà el codi del bloc catch i després el programa continuarà amb normalitat.

## 3.3. Particularitats de la clàusula catch

És important entendre que **el bloc `catch` sols capturarà excepcions del tipus indicat**. Si es produeix una excepció diferent no la capturarà. No obstant això, **capturarà excepcions heretades del tipus indicat**. Per exemple, `catch (ArithmeticException e)` capturarà qualsevol tipus d'excepció que herete de `ArithmeticException`. El cas més general és `catch (Exception e)` que capturarà tot tipus d'excepcions perquè **a Java totes les excepcions hereten de Exception**.

No obstant això, és millor utilitzar excepcions el més pròximes a la mena d'error previst, ja que el que es pretén és recuperar el programa d'alguna condició d'error i si "es fiquen totes les excepcions en el mateix sac", segurament caldrà esbrinar després quina condició d'error es va produir per a poder donar una resposta adequada.

**L'objectiu d'una clàusula `catch` és resoldre la condició excepcional perquè el programa puga continuar com si l'error mai haguera ocorregut.**

## 3.4. Clàusules catch múltiples

Es poden especificar diverses clàusules catch, tantes com vulguem, perquè cadascuna capture un
tipus diferent d'excepció.

```java
try {
  // instruccions que poden produir diferents tipus d'Excepcions
}
catch (TipusExcepcio1 e1) {
  // instruccions per a manejar un TipusExcepcio1
}
catch (TipusExcepcio2 e2) {
  // instruccions per a manejar un TipusExcepcio2
}
...

catch (TipusExcepcioN eN) {
  // instruccions per a manejar un TipusExcepcioN
}
finally { // opcional
  // instruccions que s'executaran tant si hi ha excepció com si no
}
```

Quan es llança una excepció dins del `try`, **es comprova cada sentència catch en ordre i s'executa la primera el tipus de la qual coincidisca amb l'excepció llançada**. Els altres blocs catch seran ignorats. Després s'executarà el bloc finally (si s'ha definit) i el programa continuarà la seua execució després del bloc try-catch-finally.

>[!WARNING] <strong>ATENCIÓ!:</strong>
>Si el tipus excepció produïda no coincideix amb cap dels catch, llavors l'excepció serà llançada al mètode que ens va cridar*.

Vegem un exemple amb clàusules catch múltiples.

## 3.5. Exemple 5

```java
public class Exemple_excepcions{
  public static void main(String args[]){
    int x, y, div, pos;
    int[] v = {1,2,3};
    Scanner in = new Scanner(System.in);

    try{
      System.out.print("Introdueix el numerador: ");
      x = in.nextInt();

      System.out.print("Introdueix el denominador: ");
      y = in.nextInt();

      div = x / y;

      System.out.print("La divisió és  " + div);

      System.out.print("Introdueix la posició del vector a consultar: ");
      pos = in.nextInt();

      System.out.print("l'element és: " + v[pos]);
    }catch (ArithmeticException e) {
      System.out.print("Divisió per zero: " + e);
    }catch (ArrayIndexOutOfBoundsException e) {
      System.out.print("Sobrepassat el tamany del vector: " + e);
    }
    System.out.print("Final del programa ");
  }
}
```

Poden succeir tres coses diferents:

- El try s'executa sense excepcions, s'ignoren els catch i s’imprimeix “Fin del programa”.
- Es produeix l'excepció de divisió per zero (línia 29), el flux d'execució salta al 1er catch, s’imprimeix el missatge “Divisió per zero...” i després “Final del programa”.
- Es produeix l'excepció de sobrepassar el vector, el flux d'execució salta al segon catch, s’imprimeix el missatge “Sobrepassat el tamany del vector:...” i “Final del programa”.

## 3.6. L'objecte Exception

Tota excepció genera un objecte de la classe Exception (o un més específic que hereta de Exception). Aquest objecte contindrà detalls sobre l’error produït. Pot ser interessant mostrar aquesta informació perquè la veja l’usuari/a (que sàpia què ha succeït) o el desenvolupador/a (per a depurar i corregir el codi si és pertinent). En la clàusula catch tenim accés a l'objecte en cas que vulguem utilitzar-lo:

Els dos mètodes de Exception més útils són:

- **`getMessage()`** → Retorna un String amb un text simple sobre l'error.
- **`printStackTrace()`** → És el que més informació proporciona. Indica quin tipus d'excepció s'ha produït, el missatge simple, i també tota la pila de crides. Això és el que fa Java per defecte quan una excepció no es maneja i acaba parant el programa.

```java
catch (Exception e){
  // Mostrem el missatge de l'excepció
  System.err.println(“Error: ” + e.getMessage());
  // Anem mostrar tota la informació, missatge i pila de crides
  e.printStackTrace();
}

```

Els objectes de tipus Exception tenen precarregat el mètode toString() pel que també és possible imprimir-los directament mitjançant println().

```java
catch (Exception e){
  // Mostrem el missatge de l'excepció
  System.out.println(e);
}

```
